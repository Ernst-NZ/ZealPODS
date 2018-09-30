import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DeliveryService } from '../_services/delivery.service';
import { Delivery, IDelivery } from '../_models/delivery';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

export interface Payment {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  providers: [DeliveryService],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class OrderDetailsComponent implements OnInit, AfterContentChecked {
  @ViewChild(SignaturePad)
  signaturePad: SignaturePad;
  orderDetail$: Object;
  deliveries: Array<IDelivery> = [];
  oldDelivery: IDelivery = new Delivery();
  json: Array<IDelivery> = [];
  tempJson: IDelivery = new Delivery();
  private service: DeliveryService;
  public docID;
  public signatureImage: string;
  public i: number;
  forceView = false;
  delivered = false;

  show = false;
  hidden = true;
  addDB = false;
  pay: Payment[] = [
    { value: 'No Payment', viewValue: 'No Payment' },
    { value: 'Cash', viewValue: 'Cash' },
    { value: 'Cheque', viewValue: 'Cheque' }
  ];
  public signaturePadOptions: Object = {
    // passed through to szimek/signature_pad constructor
    minWidth: 0.5,
    canvasWidth: 700,
    canvasHeight: 100,
    canvasBackgroundColor: 'white'
  };

  toggleTable() {
    this.forceView = true;
    this.show = !this.show;
    this.hidden = !this.hidden;
  }

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    service: DeliveryService,
    private router: Router
  ) {
    this.route.params.subscribe(
      params => (this.orderDetail$ = params.DocumentId)
    );
    this.service = service;
  }

  ngOnInit() {
    // this.data.getAllRoutes().subscribe(data => (this.orderDetail$ = data));
    const getOrder = this.route.snapshot.paramMap.get('DocumentId');
    this.docID = getOrder;
    this.getJson();
    this.getOrder(Number(this.docID));
  //  this.orderDetail$ = this.oldDelivery.json;
  }

  ngAfterContentChecked() {
    if (this.deliveries.length > 0) {
      if (typeof this.deliveries[0]['id'] !== 'undefined') {
        this.orderDetail$ = this.deliveries[0]['json'];
        if (this.deliveries[0]['delivered'] !== 'false') {
          this.delivered = true;
        }
        if (this.deliveries[0]['delivered'] !== 'false' && this.forceView === false) {
          for (let i = 0; i < this.deliveries.length; i++ ) {
            if (this.deliveries[i]['qtyRejected'] > 0) {
              this.hidden = false;
              this.show = true;
            }
          }
        }
      }
    }
  }

  // ## Get Json
  getJson() {
    this.service
    .getOrder(0)
    .then(deliveries => {
      this.deliveries = deliveries;
      if (deliveries.length > 0) {
        this.tempJson = deliveries[0];
      }
    })
    .catch(error => {
      console.error(error);
      alert(error.message);
    });
  }

  getOrder(documentId) {
    this.service
      .getOrder(documentId)
      .then(deliveries => {
        this.deliveries = deliveries;
        if (deliveries.length > 0) {
          this.oldDelivery = deliveries[0];
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
  }

  postData() {
    const dataSvg = this.signaturePad.toDataURL('image/svg+xml');
 //   console.log(atob(dataSvg.split(',')[1]));
 //   this.download(dataSvg, 'signature.svg');

    if (this.signaturePad.isEmpty()) {
      return alert('Please provide a signature first.');
    }
    if (this.oldDelivery.deliveredTo == null) {
      return alert('Please provide a Name.');
    }
    const signatureData = atob(dataSvg.split(',')[1]);
    const newDate = JSON.stringify(new Date());
    const deliveredTo = this.oldDelivery.deliveredTo;
    const paymentType = this.oldDelivery.paymentType;
    const paymentAmount = this.oldDelivery.paymentAmount;

    try {
      this.i = 0;
      for (let d = 0; d < this.deliveries.length; d++) {
        this.oldDelivery = this.deliveries[d];
        this.i = this.i + 1;
        this.updateDelivery(
          this.deliveries[d]['lineId'],
          signatureData,
          newDate,
          deliveredTo,
          paymentType,
          paymentAmount
        );
      }
//      alert('Delivery Successfully Updated');
      this.router.navigate(['/route-Orders/', this.oldDelivery.name]);
    } catch (error) {
      alert(error);
    }
  }

  clearOldDelivery() {
    this.oldDelivery = new Delivery();
  }

  updateDelivery(
    lineId,
    signatureData,
    newDate,
    deliveredTo,
    paymentType,
    paymentAmount
  ) {
    this.service.preUpdateDelivery( 'order', this.i,
      lineId, this.oldDelivery.lastSync,
      this.oldDelivery.name, this.oldDelivery.documentId,
      this.oldDelivery.lineId,
      this.oldDelivery.qtyOrdered,
      this.oldDelivery.qtyRejected,
      this.oldDelivery.rejectReason,
      'true',
      newDate,
      signatureData,
      deliveredTo,
      paymentType,
      paymentAmount,
      'true',
      this.tempJson.json);
  }

  /// Signature Stuff

  drawComplete() {
    if (this.signaturePad.isEmpty()) {
      return alert('Please provide a signature first.');
    }

    this.signatureImage = this.signaturePad.toDataURL();
    //  console.log(this.signatureImage);

    const dataSvg = this.signaturePad.toDataURL('image/svg+xml');
    console.log(atob(dataSvg.split(',')[1]));
    this.download(dataSvg, 'signature.svg');

    const dataJpeg = this.signaturePad.toDataURL('image/jpeg');
    this.download(dataJpeg, 'signature.jpg');

    const dataPng = this.signaturePad.toDataURL('image/png');
    this.download(dataPng, 'signature.png');

    //   console.log(dataPng);
  }

  download(dataURL, filename) {
    const blob = this.dataURLToBlob(dataURL);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    // a.style = 'display: none';
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
  }

  dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  drawClear() {
    this.signaturePad.clear();
  }
  /////

}

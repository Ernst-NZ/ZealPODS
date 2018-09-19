import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class OrderDetailsComponent implements OnInit {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  private service: DeliveryService;
  pay: Payment[] = [
    { value: 'No Payment', viewValue: 'No Payment' },
    { value: 'Cash', viewValue: 'Cash' },
    { value: 'Cheque', viewValue: 'Cheque' }
  ];
  orderDetail$: Object;
  deliveries: Array<IDelivery> = [];
  oldDelivery: IDelivery = new Delivery();
  public docID;
  show = false;
  hidden = true;
  addDB = false;
  public signaturePadOptions: Object = {// passed through to szimek/signature_pad constructor
    'minWidth': 0.5,
    'canvasWidth': 700,
    'canvasHeight': 100,
    'canvasBackgroundcolor': 'white'
  };
  public signatureImage: string;


  toggleTable() {
    this.show = !this.show;
    this.hidden = !this.hidden;
  }

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    service: DeliveryService
  ) {
    this.route.params.subscribe(
      params => (this.orderDetail$ = params.DocumentId)
    );
    this.service = service;
  }

  ngOnInit() {
    this.data.getAllRoutes().subscribe(data => (this.orderDetail$ = data));
    const getOrder = this.route.snapshot.paramMap.get('DocumentId');
    this.docID = getOrder;
    this.getOrder(Number(this.docID));
  }

  getOrder(documentId) {
    this.service.getOrder(documentId).then(deliveries => {
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

  xxx() {

    const dataSvg = this.signaturePad.toDataURL('image/svg+xml');
    console.log(atob(dataSvg.split(',')[1]));
    this.download(dataSvg, 'signature.svg');

    if (this.signaturePad.isEmpty()) {
      return alert('Please provide a signature first.');
    }
    if (this.oldDelivery.deliveredTo == null) {
      return alert('Please provide a Name.');
    }
    const signatureData = atob(dataSvg.split(',')[1]);
    const newDate = JSON.stringify(new Date())
    const deliveredTo = this.oldDelivery.deliveredTo;
    const paymentType = this.oldDelivery.paymentType;
    const paymentAmount = this.oldDelivery.paymentAmount;

    try {
      for (let d = 0; d < this.deliveries.length; d++) {
        this.oldDelivery = this.deliveries[d];
        this.updateDelivery(signatureData, newDate, deliveredTo, paymentType, paymentAmount);
      }
      alert('Delivery Successfully updated');
    } catch (error) {
      alert(error);
    }
  }

  clearOldDelivery() {
    this.oldDelivery = new Delivery();
  }

  updateDelivery(signatureData, newDate, deliveredTo, paymentType, paymentAmount) {
    const updatedValue: IDelivery = {
      lastSync: this.oldDelivery.lastSync,
      name: this.oldDelivery.name,
      documentId: this.oldDelivery.documentId,
      lineId: this.oldDelivery.lineId,
      qtyOrdered: this.oldDelivery.qtyOrdered,
      qtyRejected: this.oldDelivery.qtyRejected,
      rejectReason: this.oldDelivery.rejectReason,
      delivered: 'true',
      deliveryTime: newDate,
      signature: signatureData,
      deliveredTo: deliveredTo,
      paymentType: paymentType,
      paymentAmount: paymentAmount,
      updated: this.oldDelivery.updated,
      json: this.oldDelivery.json
    };
    this.service
      .updateDelivery(this.oldDelivery.id, updatedValue)
      .then(rowsUpdated => {
        if (rowsUpdated > 0) {
          const index = this.deliveries.findIndex(
            delivery => delivery.id === this.oldDelivery.id
          );
          this.deliveries[index] = this.oldDelivery;
          this.clearOldDelivery();
          // alert('Delivery Successfully updated');
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
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

  test() {
    alert('xxx');
    alert(JSON.stringify(new Date()));
    alert(JSON.stringify(new Date));
    this.service.editJson(this.orderDetail$, 404, 1964, 777, 'Damaged', 'signature', 'Koos', 'Cash', 99.22)
  }

}

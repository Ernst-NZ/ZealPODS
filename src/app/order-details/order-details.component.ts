import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewChecked, NgModule, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DeliveryService } from '../_services/delivery.service';
import { Delivery, IDelivery } from '../_models/delivery';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { SignaturePadModule } from 'angular2-signaturepad';
import { AppComponent } from '../app.component';
import { AutofillMonitor } from '../../../node_modules/@angular/cdk/text-field';
import { NotifierService } from 'angular-notifier';
import { SignatureComponent } from '../signature/signature.component';
import { Globals } from '../globals';

export interface Payment {
  value: string;
  viewValue: string;
}

@NgModule({
  declarations: [],
  imports: [SignaturePadModule],
  providers: [],
  bootstrap: [AppComponent],
})

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
          ], { optional: true }
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
  orderDetails$: Object;
  allRoutes$: object;
  deliveries: Array<IDelivery> = [];
  oldDelivery: IDelivery = new Delivery();
  tempDelivery: IDelivery = new Delivery();
  public notifier: NotifierService;
  oldItem: any = {};
  oldOrder: any = {};
  dataset: any = {};
  productList: any = {};
  innerWidth: any;
  cWidth: number;
  json: Array<IDelivery> = [];
  tempJson: IDelivery = new Delivery();
  private service: DeliveryService;
  public docID;
  public driver;
  public signatureImage: string;
  public i: number;
  forceView = false;
  delivered = false;
  loading = false;

  show = false;
  hidden = true;
  addDB = false;
  pay: Payment[] = [{ value: 'No Payment', viewValue: 'No Payment' }, { value: 'Cash', viewValue: 'Cash' }, { value: 'Cheque', viewValue: 'Cheque' }
  ];
  public signaturePadOptions: Object = {
    // passed through to szimek/signature_pad constructor
    // canvasWidth: this.globals.cWidth,
    canvasWidth: this.globals.cWidth,
    minWidth: 0.5,    
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
    private router: Router,
    notifier: NotifierService,
    private globals: Globals,
  ) {
    this.route.params.subscribe(
      params => (this.orderDetails$ = params.DocumentId)
    );
    this.service = service;
    this.notifier = notifier;
  }

  ngOnInit() {
    //  this.data.getAllRoutes().subscribe(data => (this.orderDetails$ = data));
    const getOrder = this.route.snapshot.paramMap.get('DocumentId');
    this.docID = getOrder;
    this.getJson();
    this.innerWidth = window.innerWidth;
    this.cWidth = this.globals.cWidth;
  }

  ngAfterContentChecked() {
    if (this.deliveries.length > 0 && this.addDB === false) {
      this.addDB = true;
      this.driver = 'Not allocated';
      this.dataset = this.tempDelivery.json;
      const drivers = this.dataset['orderGroups'];
      this.orderDetails$ = this.tempDelivery.json;
      for (let d = 0; d < drivers.length; d++) {
        const orderList = drivers[d]['Orders'];
        for (let o = 0; o < orderList.length; o++) {
          // Get Document ID
          if (orderList[o].DocumentId === Number(this.docID)) {
            this.productList = orderList[o]['Lines'];
            const products = orderList[o]['Lines'];
            this.oldDelivery = orderList[o];
            this.oldOrder = orderList[o];
            this.oldItem = orderList[o];
            for (let p = 0; p < products.length; p++) {
              if (products[p].QuantityRejected > 0) {
                this.show = true;
                this.hidden = false;
                break;
              }
            }

          }
        }

      }
    }
  }

  // ## Get Json
  // v2
  getJson() {
    this.service.getJson()
      .then(deliveries => {
        this.deliveries = deliveries;
        if (deliveries.length > 0) {
          this.tempDelivery = deliveries[0];
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
  }

  // V2 Post data
  postData() {
    const SignatureSVG = this.signaturePad.toDataURL('image/svg+xml');
    console.log(SignatureSVG);

    if (this.signaturePad.isEmpty()) {
      return alert('Please provide a signature first.');
    }
    if (this.oldOrder.ReceivedBy === '') {
      return alert('Please provide a Name.');
    }
    const newDate = JSON.stringify(new Date());

    try {
      this.loading = true;
      this.i = 0;
      for (let d = 0; d < this.productList.length; d++) {
        this.oldDelivery = this.deliveries[d];
        this.i = this.i + 1;
        this.updateDelivery(
          // this.deliveries[d]['id'], 
          0,
          SignatureSVG,
          newDate,
          this.oldOrder.ReceivedBy,
          this.oldOrder.PaymentMethod,
          this.oldOrder.PaymentAmount);
      }
    //  alert('Delivery Successfully Updated');
      this.showNotification('success', 'Delivery Successfully Updated');
      this.loading = false;
 //     this.router.navigate(['/route-Orders/', this.globals.driver ]);
    } catch (error) {
      alert(error);
    }
  }

  clearOldDelivery() {
    this.oldDelivery = new Delivery();
  }

  // V2 Update
  updateDelivery(
    Lineid,
    SignatureSVG,
    newDate,
    ReceivedBy,
    PaymentMethod,
    PaymentAmount) {
    this.loading = true;
    this.service.preUpdateDelivery('order', this.i,
      this.docID,
      Lineid,
      'true',
      this.oldOrder.QuantityRejected,
      this.oldOrder.RejectionReason,
      SignatureSVG,
      ReceivedBy,
      PaymentMethod,
      PaymentAmount,
      'true',
      this.orderDetails$);
    this.loading = false;
  }
  drawClear() {
    this.signaturePad.clear();
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
    // this.download(dataJpeg, 'signature.jpg');

    const dataPng = this.signaturePad.toDataURL('image/png');
    //  this.download(dataPng, 'signature.png');

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

  /////

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }


}

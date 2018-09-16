import { Component, ViewChild, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DeliveryService } from '../_services/delivery.service';
import { Delivery, IDelivery } from '../_models/delivery';
import {SignaturePad } from 'angular2-signaturepad/signature-pad';



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
        query(':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger('50ms',
              animate('550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })))
          ], { optional: true }),
        query(':leave', animate('50ms', style({ opacity: 0 })), { optional: true })
      ])
    ])
  ],

})
export class OrderDetailsComponent implements OnInit, AfterContentChecked {
  @ViewChild(SignaturePad)signaturePad: SignaturePad;

 
  pay: Payment[] = [
    { value: 'nopay-0', viewValue: 'No Payment' },
    { value: 'cash-1', viewValue: 'Cash' },
    { value: 'cheque', viewValue: 'Cheque' }
  ];
  private service: DeliveryService;
  deliveries: Array<IDelivery> = [];
  oldDelivery: IDelivery = new Delivery();
  orderDetail$: Object;
  public docID;
  show = false;
  hidden = true;
  addDB = false;

  toggleTable() {
    this.show = !this.show;
    this.hidden = !this.hidden;
  }

  constructor(private route: ActivatedRoute, private data: DataService, service: DeliveryService) {
    this.route.params.subscribe(params => this.orderDetail$ = params.DocumentId);
    this.service = service;
  }

  public signaturePadOptions: Object =  {// passed through to szimek/signature_pad constructor
    'minWidth': 0.5,
    'canvasWidth': 700,
    'canvasHeight': 100
  };
   public signatureImage: string;

  ngOnInit() {
    this.data.getAllRoutes().subscribe(
      data => this.orderDetail$ = data,
    );
    const getOrder = (this.route.snapshot.paramMap.get('DocumentId'));
    this.docID = getOrder;
  }

  ngAfterContentChecked() {
      //  if (this.orderDetail$ !== this.docID && this.addDB === false) {
      //      this.service.getData(this.orderDetail$);
      //      }
         }


   xxx() {
    if (this.signaturePad.isEmpty()) {
      return alert('Please provide a signature first.');
    }  
    if (this.oldDelivery.deliveredTo == null ) {
      return alert('Please provide a reason for rejection.'); 
     }  
     this.updateDelivery();
   }

   drawClear() {
    this.signaturePad.clear();
  }

   clearOldDelivery() {
    this.oldDelivery = new Delivery();
  }

   updateDelivery() {
    const dataSvg = this.signaturePad.toDataURL('image/svg+xml');
    const signatureData = atob(dataSvg.split(',')[0]);

    var displayTime = new Date().toLocaleTimeString();
    var displayDate = new Date().toLocaleDateString();
    var newdate = displayDate.concat( displayTime ); 
  
    const updatedValue: IDelivery = {
      lastSync: this.oldDelivery.lastSync,
      name: this.oldDelivery.name,
      documentId: this.oldDelivery.documentId,
      lineId: this.oldDelivery.lineId,
      qtyOrdered: this.oldDelivery.qtyOrdered,
      qtyRejected: this.oldDelivery.qtyRejected,
      rejectReason: this.oldDelivery.rejectReason,
      delivered: this.oldDelivery.delivered,
      deliveryTime: newdate,
      signature: signatureData,
      deliveredTo: this.oldDelivery.deliveredTo,
      paymentMethod: this.oldDelivery.paymentMethod,
      paymentAmount: this.oldDelivery.paymentAmount,
      updated: this.oldDelivery.updated
    };
    this.service.updateDelivery(this.oldDelivery.id, updatedValue).
      then(rowsUpdated => {
        if (rowsUpdated > 0) {
          const index = this.deliveries.findIndex(delivery => delivery.id === this.oldDelivery.id);
          this.deliveries[index] = this.oldDelivery;
          this.clearOldDelivery();
          alert('Delivery Successfully updated');
        }
      }).catch(error => {
        console.error(error);
        alert(error.message);
      });
  }

  // Signature Stuff
  drawComplete() {
    if (this.signaturePad.isEmpty()) {
      return alert('Please provide a signature first.');
    }

      this.signatureImage = this.signaturePad.toDataURL();
    //  console.log(this.signatureImage);

    const dataSvg = this.signaturePad.toDataURL('image/svg+xml');
  //  console.log(atob(dataSvg.split(',')[0]));
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

    for (let i = 0; i < rawLength; ++i ) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array],  {type: contentType });
  }

}


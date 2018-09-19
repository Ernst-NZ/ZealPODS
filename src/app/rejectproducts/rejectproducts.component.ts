import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { DataService } from '../data.service';
import { DeliveryService } from '../_services/delivery.service';
import { Delivery, IDelivery } from '../_models/delivery';

export interface Reason {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-rejectproducts',
  templateUrl: './rejectproducts.component.html',
  styleUrls: ['./rejectproducts.component.scss'],
  providers: [DeliveryService]
})
export class RejectproductsComponent implements OnInit {
  private service: DeliveryService;
  deliveries: Array<IDelivery> = [];
//  newDelivery: IDelivery = new Delivery();
  oldDelivery: IDelivery = new Delivery();

  reject: Reason[] = [
    {value: 'Damaged', viewValue: 'Damaged'},
    {value: 'Wrong Product', viewValue: 'Wrong Product'},
    {value: 'Spoiled', viewValue: 'Spoiled'}
  ];
  productDetail$: Object;
  public lineID: number;
  public docID;
  public i: number;

  constructor(private route: ActivatedRoute, private data: DataService, service: DeliveryService, private router: Router) {
    this.route.params.subscribe( params => this.productDetail$ = params.DocumentId );
    this.service = service;

 }

 ngOnInit() {
  this.data.getAllRoutes().subscribe(
    data => this.productDetail$ = data
  );
  const getLine = (this.route.snapshot.paramMap.get('LineId'));
  this.i = getLine.lastIndexOf(',');
  this.docID = getLine.substring(0, this.i);
  this.lineID = Number(getLine.substring(this.i + 1));
  this.getProduct(this.lineID);
}

 // Get Product
 getProduct(lineId) {
  this.service.getDelivery(lineId).
    then(deliveries => {
      if (deliveries.length > 0) {
        this.oldDelivery = deliveries[0];
      }
    }).catch(error => {
      console.error(error);
      alert(error.message);
    });
}

clearOldDelivery() {
  this.oldDelivery = new Delivery();
}
updateDelivery() {
  this.service.preUpdateDelivery(this.lineID, this.oldDelivery.lastSync,
this.oldDelivery.name,
this.oldDelivery.documentId,
this.oldDelivery.lineId,
this.oldDelivery.qtyOrdered,
this.oldDelivery.qtyRejected,
this.oldDelivery.rejectReason,
this.oldDelivery.delivered,
this.oldDelivery.deliveryTime,
this.oldDelivery.signature,
this.oldDelivery.deliveredTo,
this.oldDelivery.paymentType,
this.oldDelivery.paymentAmount,
this.oldDelivery.updated,
this.oldDelivery.json);
//  alert('Delivery Successfully updated');
  this.router.navigate(['/order-details/', this.docID]);
}

// updateDelivery() {
//   if (this.oldDelivery.rejectReason == null ) {
//   return alert('Please provide a reason for rejection.');  }

//   const updatedValue: IDelivery = {
//     lastSync: this.oldDelivery.lastSync,
//     name: this.oldDelivery.name,
//     documentId: this.oldDelivery.documentId,
//     lineId: this.oldDelivery.lineId,
//     qtyOrdered: this.oldDelivery.qtyOrdered,
//     qtyRejected: this.oldDelivery.qtyRejected,
//     rejectReason: this.oldDelivery.rejectReason,
//     delivered: this.oldDelivery.delivered,
//     deliveryTime: this.oldDelivery.deliveryTime,
//     signature: this.oldDelivery.signature,
//     deliveredTo: this.oldDelivery.deliveredTo,
//     paymentType: this.oldDelivery.paymentType,
//     paymentAmount: this.oldDelivery.paymentAmount,
//     updated: this.oldDelivery.updated,
//     json: this.oldDelivery.json
//   };
//   this.service.updateDelivery(this.oldDelivery.id, updatedValue).
//     then(rowsUpdated => {
//       if (rowsUpdated > 0) {
//         const index = this.deliveries.findIndex(delivery => delivery.id === this.oldDelivery.id);
//         this.deliveries[index] = this.oldDelivery;
//         this.clearOldDelivery();
//         alert('Delivery Successfully updated');
//         this.router.navigate(['/order-details/', this.docID]);
//       }
//     }).catch(error => {
//       console.error(error);
//       alert(error.message);
//     });
// }
}

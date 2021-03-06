import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { DeliveryService } from '../_services/delivery.service';
import { Delivery, IDelivery } from '../_models/delivery';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
  providers: [DeliveryService]
})

export class DeliveryComponent implements OnInit, AfterContentChecked {

  private service: DeliveryService;
  deliveries: Array<IDelivery> = [];
  newDelivery: IDelivery = new Delivery();
  oldDelivery: IDelivery = new Delivery();
  jsonFile$: object;
  id: number;

  constructor(service: DeliveryService) {
    this.service = service;
  }

  ngOnInit() {
  // this.getDeliveries();
  this.getJson();

  // this.jsonFile$ = this.deliveries[0].json;
  }
  ngAfterContentChecked() {
      if (this.deliveries.length > 0) {
        if (typeof this.deliveries[0]['id'] !== 'undefined') {
          this.id = this.deliveries[0]['id'];
           this.jsonFile$ = this.deliveries[0]['json'];
           console.log(this.jsonFile$);
        }
      }
  }

  getOrder(documentId) {
    this.service.getOrder(documentId).
    then(deliveries => {
      this.deliveries = deliveries;
    }).catch(error => {
      console.error(error);
      alert(error.message);
    });
}

  // ## Get Json
  getJson() {
    this.service.getJson().
      then(deliveries => {
        this.deliveries = deliveries;
      }).catch(error => {
        console.error(error);
        alert(error.message);
      });
  }

  // ## Get Deliveries
  getDeliveries() {
    this.service.getDeliveries().
      then(deliveries => {
        this.deliveries = deliveries;
      }).catch(error => {
        console.error(error);
        alert(error.message);
      });
  }

  // clearNewStudent() {
  //   this.newStudent = new Student();
  // }

  // deleteStudent(studentId) {
  //   this.service.deleteStudent(studentId).
  //     then(rowsDeleted => {
  //       if (rowsDeleted > 0) {
  //         const index = this.students.findIndex(student => student.id === studentId);
  //         this.students.splice(index, 1);
  //         alert('Successfully deleted');
  //       }
  //     }).catch(error => {
  //       console.error(error);
  //       alert(error.message);
  //     });
  // }

  // ## Clear Old Delivery
  clearOldDelivery() {
    this.oldDelivery = new Delivery();
  }

  // Get Delivery
  getDelivery(deliveryId) {
    this.service.getDelivery(deliveryId).
      then(deliveries => {
        if (deliveries.length > 0) {
          this.oldDelivery = deliveries[0];
        }
      }).catch(error => {
        console.error(error);
        alert(error.message);
      });
  }

  // // ## Update Delivery

  // updateDelivery() {
  //   const updatedValue: IDelivery = {
  //     lastSync: this.oldDelivery.lastSync,
  //     name: this.oldDelivery.name,
  //     documentId: this.oldDelivery.documentId,
  //     lineId: this.oldDelivery.lineId,
  //     QuantityOrdered: this.oldDelivery.QuantityOrdered,
  //     QuantityRejected: this.oldDelivery.QuantityRejected,
  //     RejectionReason: this.oldDelivery.RejectionReason,
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
  //       }
  //     }).catch(error => {
  //       console.error(error);
  //       alert(error.message);
  //     });
  // }

xxx() {
//  this.service.getProduct(1965)
//  this.service.getNewData();


 // this.service.editJson('', 404, 1964, 777, 'Damaged', 'signature', 'Koos', 'Cash', 99.22)
}

  }



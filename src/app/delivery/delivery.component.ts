import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../_services/delivery.service';
import { Delivery, IDelivery } from '../_models/delivery';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
  providers: [DeliveryService]
})

export class DeliveryComponent implements OnInit {

  private service: DeliveryService;
  deliveries: Array<IDelivery> = [];
  newDelivery: IDelivery = new Delivery();
  oldDelivery: IDelivery = new Delivery();

  constructor(service: DeliveryService) {
    this.service = service;
  }

  ngOnInit() {
    this.getDeliveries();
    this.getOrder(402);
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

  // ## Update Delivery

  updateDelivery() {
    const updatedValue: IDelivery = {
      lastSync: this.oldDelivery.lastSync,
      name: this.oldDelivery.name,
      documentId: this.oldDelivery.documentId,
      lineId: this.oldDelivery.lineId,
      qtyOrdered: this.oldDelivery.qtyOrdered,
      qtyRejected: this.oldDelivery.qtyRejected,
      rejectReason: this.oldDelivery.rejectReason,
      delivered: this.oldDelivery.delivered,
      deliveryTime: this.oldDelivery.deliveryTime,
      signature: this.oldDelivery.signature,
      deliveredTo: this.oldDelivery.deliveredTo,
      paymentType: this.oldDelivery.paymentType,
      paymentAmount: this.oldDelivery.paymentAmount,
      updated: this.oldDelivery.updated,
      json: this.oldDelivery.json
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

xxx() {
  alert('xxx');
  alert(JSON.stringify(new Date()));
  alert(JSON.stringify(new Date));
 // this.service.editJson('', 404, 1964, 777, 'Damaged', 'signature', 'Koos', 'Cash', 99.22)
}

  }



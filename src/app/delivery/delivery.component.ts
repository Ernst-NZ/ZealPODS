import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../_services/delivery.service';
import { Student, IStudent, Deliveryz, IDelivery } from '../_models/delivery';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
  providers: [DeliveryService]
})

export class DeliveryComponent implements OnInit {

  private service: DeliveryService;
  students: Array<IStudent> = [];
  newStudent: IStudent = new Student();
  oldStudent: IStudent = new Student();
  deliveries: Array<IDelivery> = [];
  newDelivery: IDelivery = new Deliveryz();
  oldDelivery: IDelivery = new Deliveryz();

  constructor(service: DeliveryService) {
    this.service = service;
  }

  ngOnInit() {
 //   this.getStudents();
    this.getDeliveries();
  }

  getStudents() {
    this.service.getStudents().
      then(students => {
        this.students = students;
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

  addStudent() {
    this.service.addStudent(this.newStudent).
      then((addedStudents: IStudent[]) => {
        if (addedStudents.length > 0) {
          this.students.push(addedStudents[0]);
          this.clearNewStudent();
          alert('Successfully added');
        }
      }).catch(error => {
        console.error(error);
        alert(error.message);
      });
  }

  clearNewStudent() {
    this.newStudent = new Student();
  }

  deleteStudent(studentId) {
    this.service.deleteStudent(studentId).
      then(rowsDeleted => {
        if (rowsDeleted > 0) {
          const index = this.students.findIndex(student => student.id === studentId);
          this.students.splice(index, 1);
          alert('Successfully deleted');
        }
      }).catch(error => {
        console.error(error);
        alert(error.message);
      });
  }

  clearOldStudent() {
    this.oldStudent = new Student();
  }

  // ## Clear Old Delivery
  clearOldDelivery() {
    this.oldDelivery = new Deliveryz();
  }

  getStudent(studentId) {
    this.service.getStudent(studentId).
      then(students => {
        if (students.length > 0) {
          this.oldStudent = students[0];
        }
      }).catch(error => {
        console.error(error);
        alert(error.message);
      });
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

  updateStudent() {
    const updatedValue: IStudent = {
      name: this.oldStudent.name,
      gender: this.oldStudent.gender,
      country: this.oldStudent.country,
      city: this.oldStudent.city
    };
    this.service.updateStudent(this.oldStudent.id, updatedValue).
      then(rowsUpdated => {
        if (rowsUpdated > 0) {
          const index = this.students.findIndex(student => student.id === this.oldStudent.id);
          this.students[index] = this.oldStudent;
          this.clearOldStudent();
          alert('Successfully updated');
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
      cash: this.oldDelivery.cash,
      delivered: this.oldDelivery.delivered,
      deliveryTime: this.oldDelivery.deliveryTime,
      signature: this.oldDelivery.signature,
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
  }



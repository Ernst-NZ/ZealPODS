import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../_services/delivery.service';
import { Delivery, IStudent } from '../_models/delivery';



@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
  providers: [DeliveryService]
})


export class DeliveryComponent implements OnInit {

  private service: DeliveryService;
  students: Array<IStudent> = [];
  newStudent: IStudent = new Delivery();
  oldStudent: IStudent = new Delivery();

  constructor(service: DeliveryService) {
    this.service = service;
  }

  ngOnInit() {
    this.getStudents();
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
    this.newStudent = new Delivery();
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
    this.oldStudent = new Delivery();
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

}

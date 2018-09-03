import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IStudent, IDelivery } from '../_models/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService extends BaseService {

  constructor() {
    super();
  }

  getStudents() {
    return this.connection.select<IStudent>({
      from: 'Students'
    });
  }
 
  addStudent(student: IStudent) {
    alert(student)
    return this.connection.insert<IStudent>({
      into: 'Students',
      return: true, // as id is autoincrement, so we would like to get the inserted value
      values: [student]
    });
  }

  deleteStudent(studentId: number) {
    return this.connection.remove({
      from: 'Students',
      where: {
        id: studentId
      }
    });
  }

  updateStudent(studentId: number, updateValue: IStudent) {
    return this.connection.update({
      in: 'Students',
      where: {
        id: studentId
      },
      set: updateValue
    });
  }

  getStudent(studentId: number) {
    return this.connection.select<IStudent>({
      from: 'Students',
      where: {
        id: studentId
      }
    });
  }
//### DeliveryStuff
  myTest() {
    alert('test')
    };

    addDelivery(delivery: IDelivery) {
      return this.connection.insert<IDelivery>({
        into: 'Deliveries',
        return: true, // as id is autoincrement, so we would like to get the inserted value
        values: [delivery]
      });
    }
    
//### End

  }


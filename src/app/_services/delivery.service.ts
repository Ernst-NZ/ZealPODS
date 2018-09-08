import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IStudent, IDelivery } from '../_models/delivery';
import { DataService} from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService extends BaseService {
  orderDetail$: Object;
  constructor(private data: DataService) {
    super();
  }

  getStudents() {
    return this.connection.select<IStudent>({
      from: 'Students'
    });
  }

  addStudent(student: IStudent) {
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
  // ### DeliveryStuff
  myTest() {
    alert('test');
  }

  addDelivery(delivery: IDelivery) {
    return this.connection.insert<IDelivery>({
      into: 'Deliveries',
      return: true, // as id is autoincrement, so we would like to get the inserted value
      values: [delivery]
    });
  }

  db1Test(id, name, gender, country, city) {
    const open = indexedDB.open('Delivery_db', 1);

    open.onupgradeneeded = function () {
      const db = open.result;
      const store = db.createObjectStore('DeliveryStore', { keyPath: 'id' });
      // var index = store.createIndex("LineIndex", ["lineID"]);
    };

    open.onsuccess = function () {
      // Start a new transaction
      const db = open.result;
      const tx = db.transaction('DeliveryStore', 'readwrite');
      const store = tx.objectStore('DeliveryStore');
  //    var index = store.index("NameIndex");

     store.put({ id, gender: gender, name: name, country: country, city: city});
//    store.put({ id: 67890, name: { first: "Bob", last: "Smith" }, age: 35 });

    // Close the db when the transaction is done
      tx.oncomplete = function () {
        db.close();
      };
    };

  }

  AddDelivery() {

    this.data.getAllRoutes().subscribe(
      data => this.orderDetail$ = data
    );

    this.db1Test('777', 'from TS', 'M', 'USA', 'NY');

  }

  test1(user, lastSync, DriverList) {
    console.log('## In Service ****');
    console.log('User: ' + user);
    console.log('lastSync: ' + lastSync);
    const driverList = [DriverList.Orders];
    for (let i = 0; i < driverList.length; i++) {
      for (let j = 0; j < driverList[i][j].length; j++ ) {
        console.log ('DocID: ' + driverList[i][j]);
        for (let k = 0; k < driverList[i][j][k].length; k++ ) {
          console.log ( driverList[i][j][k]);
           }
         }
    }

  }

  // ### End

}


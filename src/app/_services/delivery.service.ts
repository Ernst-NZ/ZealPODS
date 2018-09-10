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

  // ## Get Deliveries
  getDeliveries() {
    return this.connection.select<IDelivery>({
      from: 'Deliveries'
    });
  }

  addStudent(student: IStudent) {
    return this.connection.insert<IStudent>({
      into: 'Students',
      return: true, // as id is autoincrement, so we would like to get the inserted value
      values: [student]
    });
  }

  // #### Add Delivery
  addDelivery(delivery: IDelivery) {
    return this.connection.insert<IDelivery>({
      into: 'Deliveries',
      return: true, // as id is autoincrement, so we would like to get the inserted value
      values: [delivery]
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
  //  ## Not going to enable Delete for Deliveries

  updateStudent(studentId: number, updateValue: IStudent) {
    return this.connection.update({
      in: 'Students',
      where: {
        id: studentId
      },
      set: updateValue
    });
  }

  // ## update Product for Edit purposes
  updateDelivery(lineId: number, updateValue: IDelivery) {
    return this.connection.update({
      in: 'Deliveries',
      where: {
        id: lineId
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

  // ## Get Delivery
  getDelivery(deliveryId: number) {
    return this.connection.select<IDelivery>({
      from: 'Deliveries',
      where: {
        id: deliveryId
      }
    });
  }

    // ### Test Stuff


    db1Test(id, name, gender, country, city) {
      // const open = indexedDB.open('Student_db', 1);
      const open = indexedDB.open('Delivery_db', 1);

      open.onupgradeneeded = function () {
        const db = open.result;
         const store = db.createObjectStore('DeliveryStore', { keyPath: 'id' });
       // const store = db.createObjectStore('Students', { keyPath: 'id' });
        // var index = store.createIndex("LineIndex", ["lineID"]);
      };

      open.onsuccess = function () {
        // Start a new transaction
        const db = open.result;
         const tx = db.transaction('Deliveries', 'readwrite');
         const store = tx.objectStore('Deliveries');
     //   const tx = db.transaction('Students', 'readwrite');
     //   const store = tx.objectStore('Students');
    //    var index = store.index("NameIndex");

 //     store.put({ id, gender: gender, name: name, country: country, city: city});
        store.put({id, lastSync: 'lastSync', name: 'Name', documentId: 123,
                lineId: 456, qtyOrdered: 10, qtyRejected: 5,
                rejectReason: 'Damaged', cash: 4, delivered: 'true',
              deliveryTime: '10:00', signature: 'Ernst', updated: '0' });
  // // // // //    store.put({ id: 67890, name: { first: "Bob", last: "Smith" }, age: 35 });

      // Close the db when the transaction is done
        tx.oncomplete = function () {
          db.close();
        };
      };

    }

    AddStudentTest() {

      this.db1Test(456, 'from TS', 'M', 'USA', 'NY');

    }

   AddDeliveryx(lastSync, user, documentID, lineID, qtyOrdered) {

   }

    getData(dataList) {
      // this.data.getAllRoutes().subscribe(
      //   data => this.orderDetail$ = data
      // );

      const user = dataList.User;
      const lastSync = dataList.LastSyncronisation;
      const drivers = dataList.orderGroups;
        for (let d = 0; d < drivers.length; d++) {
          const orderList = drivers[d]['Orders'];
           for (let o = 0; o < orderList[o].length; o++ ) {
             const products = orderList[o]['Lines'];
             const DocumentId = orderList[o].DocumentId;
             for (let p = 0; p < products[p].length; p++ ) {
              const LineId = products[p].LineId;
              const QTYOrdered = products[p].QTYOrdered;
            //  this.AddDelivery(lastSync, user, DocumentId, LineId, QTYOrdered);
              }
             }
          }

    }

    // ### End


}

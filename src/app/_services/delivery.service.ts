import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IDelivery } from '../_models/delivery';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService extends BaseService {
  orderDetail$: Object;
  constructor(private data: DataService) {
    super();
  }

  // ## Get Deliveries
  getDeliveries() {
    return this.connection.select<IDelivery>({
      from: 'Deliveries'
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

  // deleteStudent(studentId: number) {
  //   return this.connection.remove({
  //     from: 'Students',
  //     where: {
  //       id: studentId
  //     }
  //   });
  // }
  //  ## Not going to enable Delete for Deliveries

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

  // ## Get Delivery
  getDelivery(deliveryId: number) {
    return this.connection.select<IDelivery>({
      from: 'Deliveries',
      where: {
        id: deliveryId
      }
    });
  }

  getOrder(documentId: number) {
    return this.connection.select<IDelivery>({
      from: 'Deliveries',
      where: {
        documentId: documentId
      }
    });
  }

  // ### Test Stuff

  db1Test(id, lastSync, user, documentID, lineID, description, productCode, sellPrice, qtyOrdered) {
    // const open = indexedDB.open('Student_db', 1);
    const open = indexedDB.open('Delivery_db', 1);

    open.onupgradeneeded = function () {
      const db = open.result;
      const store = db.createObjectStore('DeliveryStore', { keyPath: 'id' });
      // const store = db.createObjectStore('Students', { keyPath: 'id' });
     // const index = store.createIndex('LineIndex', ['lineID']);
    };

    open.onsuccess = function () {
      // Start a new transaction
      const db = open.result;
      const tx = db.transaction('Deliveries', 'readwrite');
      const store = tx.objectStore('Deliveries');
      //   const tx = db.transaction('Students', 'readwrite');
      //   const store = tx.objectStore('Students');
      //    var index = store.index('NameIndex');

      //     store.put({ id, gender: gender, name: name, country: country, city: city});
      store.put({
        id,
        lastSync: lastSync,
        name: user,
        documentId: documentID,
        lineId: lineID,
        description: description,
        productCode: productCode,
        sellPrice: sellPrice,
        qtyOrdered: qtyOrdered,
        qtyRejected: 0,
        delivered: 'false',
        updated: 'false'
      });
     
      // Close the db when the transaction is done
      tx.oncomplete = function () {
        db.close();
      };
    };
  }

  getData(dataList, driverName) {
    // this.data.getAllRoutes().subscribe(
    //   data => this.orderDetail$ = data
    // );
    console.log(dataList)
    const lastSync = dataList.LastSyncronisation;
    const drivers = dataList.orderGroups;
    for (let d = 0; d < drivers.length; d++) {
      if (drivers[d].Name === driverName) {
        const user = drivers[d].Name;
        const orderList = drivers[d]['Orders'];
        for (let o = 0; o < orderList.length; o++) {
          const products = orderList[o]['Lines'];
          const DocumentId = orderList[o].DocumentId;
          orderList[o].DocumentId = '99999999'
          // Check for existing document ID
          this.getOrder(DocumentId).then(deliveries => {
            if (deliveries.length < 1) {
              for (let p = 0; p < products.length; p++) {
                const LineId = products[p].LineId;
                const QTYOrdered = products[p].QuantityOrdered;
                const description = products[p].Description;
                const productCode = products[p].ProductCode;
                const sellPrice = products[p].SellPrice;
                this.db1Test(
                  LineId,
                  lastSync,
                  user,
                  DocumentId,
                  LineId,
                  description,
                  productCode,
                  sellPrice,
                  QTYOrdered
                );
              }
            }

          })
        }
      }
    }
    console.log('#######  Mod  xxxxxxxx')
    console.log(dataList)
  }
  // ### End
}

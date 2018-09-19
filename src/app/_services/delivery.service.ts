import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { DataService } from '../data.service';
import { Delivery, IDelivery } from '../_models/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService extends BaseService {
  orderDetail$: Object;
  deliveries: Array<IDelivery> = [];
  oldDelivery: IDelivery = new Delivery();
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
  // Get Product
  getProduct(lineId) {
    this.getDelivery(lineId).
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

  preUpdateDelivery(id, qtyRejected, rejectReason, delivered, deliveryTime, signature, deliveredTo, paymentType, paymentAmount, json) {
    this.getProduct(id);
    if (qtyRejected === '') { qtyRejected = this.oldDelivery.qtyRejected; }
    if (rejectReason === '') { rejectReason = this.oldDelivery.rejectReason; }
    if (delivered === '') {
      delivered = this.oldDelivery.delivered;
    }
    if (deliveryTime === '') {
      deliveryTime = this.oldDelivery.deliveryTime;
    }
    if (signature === '') {
      signature = this.oldDelivery.signature;
    }
    if (deliveredTo === '') {
      deliveredTo = this.oldDelivery.deliveredTo;
    }
    if (paymentType === '') {
      paymentType = this.oldDelivery.paymentType;
    }
    if (paymentAmount === '') {
      paymentAmount = this.oldDelivery.paymentAmount;
    }
    if (json === '') { json = this.oldDelivery.json; }

    const updatedValue: IDelivery = {
      lastSync: this.oldDelivery.lastSync,
      name: this.oldDelivery.name,
      documentId: this.oldDelivery.documentId,
      lineId: this.oldDelivery.lineId,
      qtyOrdered: this.oldDelivery.qtyOrdered,
      qtyRejected: qtyRejected,
      rejectReason: rejectReason,
      delivered: delivered,
      deliveryTime: deliveryTime,
      signature: signature,
      deliveredTo: deliveredTo,
      paymentType: paymentType,
      paymentAmount: paymentAmount,
      updated: this.oldDelivery.updated,
      json: json
    };
    // this.updateDelivery(id, updatedValue).
    //   then(rowsUpdated => {
    //     if (rowsUpdated > 0) {
    //       const index = this.deliveries.findIndex(delivery => delivery.id === this.oldDelivery.id);
    //       this.deliveries[index] = this.oldDelivery;
    //       this.clearOldDelivery();
    //       alert('Delivery Successfully updated');
    //     }
    //   }).catch(error => {
    //     console.error(error);
    //     alert(error.message);
    //   });
  }

  // #####
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

  db1Test(id, lastSync, user, documentID, lineID, description, productCode, sellPrice, qtyOrdered, json) {
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
        updated: 'false',
        json: json
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
    const lastSync = dataList.LastSyncronisation;
    const drivers = dataList.orderGroups;
    for (let d = 0; d < drivers.length; d++) {
      if (drivers[d].Name === driverName) {
        const user = drivers[d].Name;
        const orderList = drivers[d]['Orders'];
        for (let o = 0; o < orderList.length; o++) {
          const products = orderList[o]['Lines'];
          const DocumentId = orderList[o].DocumentId;
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
                  QTYOrdered,
                  dataList
                );
              }
            }

          });
        }
      }
    }
  }
  // ### End
}

import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { DataService } from '../data.service';
import { Delivery, IDelivery } from '../_models/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService extends BaseService {
  orderDetail$: Object;
  tempDeliveries: Array<IDelivery> = [];
  tempDelivery: IDelivery = new Delivery();
  constructor(private data: DataService) {
    super();
  }
  // ### Get funtions (SQL Actions) ####
  // ## Get Deliveries
  getDeliveries() {
    return this.connection.select<IDelivery>({
      from: 'Deliveries'
    });
  }

  getJson() {
    return this.connection.select<IDelivery>({
      from: 'Deliveries',
      where: {
        lineId: 0
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

  // ## Get all Deliveries per driver
  getDriverDeliveries(name: string) {
    return this.connection.select<IDelivery>({
      from: 'Deliveries',
      where: {
        name: name
      }
    });
  }

  // ## Get outstanding Deliveries
  getOutstandingDeliveries(name: string) {
    return this.connection.select<IDelivery>({
      from: 'Deliveries',
      where: {
        id: name,
        delivered: 'false'
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

  // **** ####  Test Zone  #### ****
  // ## update Product for Edit purposes
  // Get Product
  getProduct(lineId) {
    this.getDelivery(lineId)
      .then(deliveries => {
        if (deliveries.length > 0) {
          this.tempDelivery = deliveries[0];
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
  }

  test2() {
    this.getProduct(1965);
  }

  serviceTest() {
    const re = /-/gi;
    const str = '2018-09-20T00:00:00+12:00';
    const xx = str.substring(4, 10);
    const newstr = xx.replace(re, '');
    alert(newstr);
    console.log(newstr);
    console.log('start');
    console.log(this.tempDelivery);
    console.log('before get Product');
    //    this.test2();
    this.getProduct(1965);
    console.log('after get Product');
    console.log(this.tempDelivery);
    console.log('done');
  }

  clearOldDelivery() {
    //  this.oldDelivery = new Delivery();
  }
  // **** ####  Test Zone  #### ****

  // tslint:disable-next-line:max-line-length
  preUpdateDelivery( type, 
    id, lastSync, name, docId, lineId, order,
    reject, reason, delivered, time, signature,
    deliveredTo, payType, payAmount,
    updated, json) {
      let jsonTemp = json;
    // Update the Json String
    if (type === 'order') {
        jsonTemp = this.editJson(
        lineId, json, docId, lineId, reject,
        reason, delivered, signature, deliveredTo,
        payType, payAmount
      );
    }

    /// Post Json
    if (delivered === 'true') {
      try {
        this.data.postJson(jsonTemp);
      } catch (error) {
        alert(error);
        console.log(error);
      }      
    }

    const updatedValue: IDelivery = {
      lastSync: lastSync,
      name: name,
      documentId: docId,
      lineId: lineId,
      qtyOrdered: order,
      qtyRejected: reject,
      rejectReason: reason,
      delivered: delivered,
      deliveryTime: time,
      signature: signature,
      deliveredTo: deliveredTo,
      paymentType: payType,
      paymentAmount: payAmount,
      updated: updated,
      json: jsonTemp
    };
    this.updateDelivery(id, updatedValue)
      .then(rowsUpdated => {
        if (rowsUpdated > 0) {
          const index = this.tempDeliveries.findIndex(
            delivery => delivery.id === id
          );
          this.tempDeliveries[index] = this.tempDelivery;
          this.clearOldDelivery();
  //        alert('Delivery Successfully updated');
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
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

  updateJson(lineId: number, updateValue: IDelivery) {
    return this.connection.update({
      in: 'Deliveries',
      where: {
        id: lineId
      },
      set: updateValue
    });
  }

  // ### Test Stuff
  dbAdd(
    id,
    lastSync,
    user,
    documentID,
    lineID,
    description,
    productCode,
    sellPrice,
    qtyOrdered,
    json
  ) {
    // const open = indexedDB.open('Student_db', 1);
    const open = indexedDB.open('Delivery_db', 1);

    open.onupgradeneeded = function() {
      const db = open.result;
      const store = db.createObjectStore('DeliveryStore', { keyPath: 'id' });
      // const store = db.createObjectStore('Students', { keyPath: 'id' });
      // const index = store.createIndex('LineIndex', ['lineID']);
    };

    open.onsuccess = function() {
      // Start a new transaction
      const db = open.result;
      const tx = db.transaction('Deliveries', 'readwrite');
      const store = tx.objectStore('Deliveries');
      //   const tx = db.transaction('Students', 'readwrite');
      //   const store = tx.objectStore('Students');
      //    var index = store.index('NameIndex');

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
      tx.oncomplete = function() {
        db.close();
      };
    };
  }

  checkAddJson(dataList) {
    const drivers = dataList.orderGroups;
    for (let d = 0; d < drivers.length; d++) {
      const orderList = drivers[d]['Orders'];
      for (let o = 0; o < orderList.length; o++) {
        const DocumentId = orderList[o].DocumentId;
        // check order no
        this.getOrder(0).then(deliveries => {
          if (deliveries.length < 1) {
            this.dbAdd(0, dataList.LastSyncronisation, '', 0, 0, '', '', 0, 0, dataList);
          } else if (deliveries[0].delivered === 'true' && deliveries[0].updated === 'true') {
            this.dbAdd(
              0, dataList.LastSyncronisation, '', 0, 0,
              '', '', 0, 0, dataList
            );
          }
        });
      }
    }
  }

  getData(dataList, driverName) {
    this.checkAddJson(dataList);
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
                this.dbAdd(LineId, lastSync, user, DocumentId,
                  LineId, description, productCode, sellPrice,
                  QTYOrdered, dataList
                );
              }
            }
          });
        }
      }
    }
  }
  // ### End

  /// Edit Json
  editJson( newId, dataTemp, docId, lineId,
    qtyRejected, reason, delivered, signature,
    name, payType, payAmount ) {


    const drivers = dataTemp.orderGroups;
    for (let d = 0; d < drivers.length; d++) {
      const orderList = drivers[d]['Orders'];
      for (let o = 0; o < orderList.length; o++) {
        const products = orderList[o]['Lines'];
        // Get Document ID

        if (orderList[o].DocumentId === docId) {
          orderList[o].Delivered = true;
          orderList[o].DeliveryTime = JSON.stringify(new Date());
          orderList[o].ReceivedBy = name;
          orderList[o].PaymentMethod = payType;
          orderList[o].PaymentAmount = payAmount;
      //    orderList[o].signature = signature;
          for (let p = 0; p < products.length; p++) {
            if (products[p].LineId === lineId) {
              products[p].QuantityRejected = qtyRejected;
              products[p].RejectionReason = reason;
            }
          }
        }
      }
    }
    const updatedValue: IDelivery = {
      lastSync: dataTemp.LastSyncronisation,
      name: dataTemp.name, documentId: docId, 
      lineId: lineId, qtyOrdered: dataTemp.qtyOrdered,
      qtyRejected: qtyRejected, rejectReason: reason,
      delivered: delivered, deliveryTime: '',
      signature: '', deliveredTo: name,
      paymentType: payType, paymentAmount: payAmount,
      updated: 'true', json: dataTemp
    };
    this.updateDelivery(0, updatedValue)
      .then(rowsUpdated => {
        if (rowsUpdated > 0) {
          const index = this.tempDeliveries.findIndex(
            delivery => delivery.id === 0
          );
          this.tempDeliveries[index] = this.tempDelivery;
          this.clearOldDelivery();
    //      alert('Delivery Successfully updated');
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
    return dataTemp;
  }

  //// Check and post Delivery
  // #########################
  // When a product has been rejected the delivery status is set as "product"
  // When the signatures and name is added the delivery status is set as "true"
  // When off line -
  // It is possible that the staus can be set as true for one order 
  // and then for the next order after a rejection it will be reset to "product".
  // This will prevent the Json string to be over written when there are pending changes
  

}

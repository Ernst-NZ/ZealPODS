import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { DataService } from '../data.service';
import { Delivery, IDelivery } from '../_models/delivery';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alert } from 'selenium-webdriver';
import { NotifierService } from 'angular-notifier';
import { Globals } from '../globals';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DeliveryService extends BaseService {
  orderDetails$: Object;
  updateStatus: String;
  addJson = false;
  addDB = false;
  tempDeliveries: Array<IDelivery> = [];
  tempDelivery: IDelivery = new Delivery();
  public notifier: NotifierService;
  constructor(private data: DataService, private http: HttpClient,
    notifier: NotifierService, private route: ActivatedRoute,
    private router: Router, private globals: Globals,) {
    super();
    this.notifier = notifier;
  }
  // ### Get funtions (SQL Actions) ####
  // ## Get Deliveries
  getDeliveries() {
    return this.connection.select<IDelivery>({
      from: 'Deliveries'
    });
  }

  // V2
  // Ckeck for incomplete deliveries to prevent refresh of Json String
 getIncompleteDeliveries() {
    return this.connection.select<IDelivery>({
      from: 'Deliveries',
      // where: {
      //   delivered: 'product'
      //   // , updated: 'false'
      // }
    });
  }

  // V2
  getJson() {
    return this.connection.select<IDelivery>({
      from: 'Deliveries',
      where: {
        id: 0
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

  clearAll() {
    this.connection.clear('Deliveries');
  }


   deleteDelivery(docId: number) {
     return this.connection.remove({
       from: 'Deliveries',
       where: {
         documentId: docId
       }
     });
   }

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


  // tslint:disable-next-line:max-line-length
  // V2 .. Step 3
  preUpdateDelivery( type, productNo,
    docId, lineId, delivered,
    QuantityRejected, RejectionReason, SignatureSVG,
    ReceivedBy, PaymentMethod, PaymentAmount, Updated,
    json) {
      let jsonTemp = json;
    // Update the Json String
    if (type === 'product' && productNo === 0) {
      jsonTemp = this.upDateJson(type, docId, lineId, delivered, QuantityRejected,
          RejectionReason, SignatureSVG, ReceivedBy,
        PaymentMethod, PaymentAmount, Updated, jsonTemp
      );
  //    this.productAdd(lineId,docId, lineId, RejectionReason, ReceivedBy)
    } else if (type === 'order' && productNo === 1) {
      jsonTemp = this.upDateJson(type, docId, lineId, delivered, QuantityRejected,
        RejectionReason, SignatureSVG, ReceivedBy,
        PaymentMethod, PaymentAmount, Updated, jsonTemp
      );
     // Delete order if exist
    }
    const updatedValue: IDelivery = {
      id: Number(lineId), documentId: Number(docId),
      delivered: 'true',
      QuantityRejected: Number(QuantityRejected), RejectionReason: RejectionReason,
      SignatureSVG: SignatureSVG, ReceivedBy: ReceivedBy,
      PaymentMethod: PaymentMethod, PaymentAmount: Number(PaymentAmount),
      updated: Updated, json: jsonTemp
    };
    this.updateDelivery(0, updatedValue)
      .then(rowsUpdated => {
        if (rowsUpdated > 0) {
          const index = this.tempDeliveries.findIndex(
            delivery => delivery.id === 0
          );
           this.tempDeliveries[index] = this.tempDelivery;
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
    if (this.addJson === false && type === 'order') {
      this.postJson(jsonTemp);
      this.addJson = true;
      return;
    }
  }

  // #####
  // V2
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
    QuantityOrdered,
    json
  ) {
    const open = indexedDB.open('ZEDS_db', 1);

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
        id: id,
        lastSync: '',
        name: '',
        documentId: '',
        lineId: lineID,
        description: '',
        productCode: '',
        sellPrice: '',
        QuantityOrdered: 0,
        QuantityRejected: 0,
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

  // ### Test Stuff
  // V2
  orderAdd(
    id,
    user,
    documentID,
    lineID,
    QuantityOrdered,
    description,
    productCode,
    sellPrice
  ) {
    const open = indexedDB.open('ZEDS_db', 1);

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

      store.put({
        id: id,
        lastSync: '',
        name: user,
        documentId: documentID,
        lineId: lineID,
        description: description,
        productCode: productCode,
        sellPrice: sellPrice,
        QuantityOrdered: QuantityOrdered,
        QuantityRejected: 0,
        delivered: 'false',
        updated: 'false',
        json: ''
      });
      // Close the db when the transaction is done
      tx.oncomplete = function () {
        db.close();
      };
    };
  }

  // V2 Add an enry after aproduct has been rejected
  // This will stop the Json from refreshing
  // DB entry is added from rejected page with status:
  // delivered = 'product'
  productAdd(
    id,
    documentID,
    lineID,
    QuantityRejected,
    deliveredTo
  ) {
    const open = indexedDB.open('ZEDS_db', 1);

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

      store.put({
        id: Number(id),
        documentId: Number(documentID),
        lineId: Number(lineID),
        QuantityRejected: Number(QuantityRejected),
        delivered: 'false',
        deliveredTo: deliveredTo,
        updated: 'false'
      });
      // Close the db when the transaction is done
      tx.oncomplete = function () {
        db.close();
      };
    };
  }

  preOrderAdd(dataList, documentId) {
    // this.checkAddJson(dataList);
    const drivers = dataList.orderGroups;
    for (let d = 0; d < drivers.length; d++) {
   //   if (drivers[d].Name === driverName) {
        const user = drivers[d].Name;
        const orderList = drivers[d]['Orders'];
        for (let o = 0; o < orderList.length; o++) {
          const products = orderList[o]['Lines'];
          if (drivers[o].DocumentId === Number(documentId)) {
          const DocumentId = orderList[o].DocumentId;
          // Check for existing document ID
          this.getOrder(DocumentId).then(deliveries => {
            if (deliveries.length < 1) {
              for (let p = 0; p < products.length; p++) {
                const LineId = products[p].LineId;
                const QuantityOrdered = products[p].QuantityOrdered;
                const description = products[p].Description;
                const productCode = products[p].ProductCode;
                const sellPrice = products[p].SellPrice;
                this.orderAdd(LineId, user, DocumentId,
                  LineId, QuantityOrdered, description, productCode, sellPrice
                );
                break;
              }
            }
          });
        }
        }
  //    }
    }
  }

  // ### End

  /// Edit Json
  // V2
  upDateJson(type, docId, lineId, delivered,
    QuantityRejected, RejectionReason, SignatureSVG,
    ReceivedBy, PaymentMethod, PaymentAmount, Updated, jsonTemp ) {
    const drivers = jsonTemp.orderGroups;
    for (let d = 0; d < drivers.length; d++) {
      const orderList = drivers[d]['Orders'];
      for (let o = 0; o < orderList.length; o++) {
        const products = orderList[o]['Lines'];
        // Get Document ID

        if (orderList[o].DocumentId === Number(docId)) {
          orderList[o].Delivered = 'true';
          orderList[o].DeliveryTime = 'JSON.stringify(new Date())';
          orderList[o].ReceivedBy = ReceivedBy;
          orderList[o].PaymentMethod = PaymentMethod;
          orderList[o].PaymentAmount = PaymentAmount;
          orderList[o].Updated = Updated;
          orderList[o].SignatureSVG = SignatureSVG;
          if (type === 'product') {
            for (let p = 0; p < products.length; p++) {
              if (products[p].LineId === lineId) {
                products[p].QuantityRejected = Number(QuantityRejected);
                products[p].RejectionReason = RejectionReason;
                break;
              }
            }
          } else {break;}
        }
      }
    }
    const updatedValue: IDelivery = {
      id: 0, documentId: Number(docId),
      delivered: 'true',
      QuantityRejected: QuantityRejected,
      RejectionReason: RejectionReason,
      SignatureSVG: SignatureSVG,
      ReceivedBy: name,
      PaymentMethod: PaymentMethod, PaymentAmount: PaymentAmount,
      updated: 'true', json: jsonTemp
    };
    this.updateDelivery(0, updatedValue)
      .then(rowsUpdated => {
        if (rowsUpdated > 0) {
          const index = this.tempDeliveries.findIndex(
            delivery => delivery.id === 0
          );
          this.tempDeliveries[index] = this.tempDelivery;
          //      this.clearOldDelivery();
          //      alert('Delivery Successfully updated');
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
    return jsonTemp;
  }
  postJson(dataString) {
    console.log(dataString);
     return this.http.post('https://test1.zealsystems.co.nz/api/values', dataString)
       .subscribe(
         val => {
           this.showNotification('success', 'Delivery Posted to Main Server');
           this.data.getAllRoutes().subscribe(data => (this.orderDetails$ = data));
           this.checkJson();
       //    this.router.navigate(['/route-Orders/', this.globals.driver]);
           this.router.navigate(['/']);
           //    Clear Indexed DB - Gete new info and populate
//             this.deleteDelivery(docId)
         },
         response => {
           alert('Server Update error ' && response);
           this.router.navigate(['/']);
         },
         () => {
         }
       );
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  checkJson() {
      this.dbAdd(
        0, '', '', 0, 0,
        '', '', 0, 0, this.orderDetails$
      );      
  }
}

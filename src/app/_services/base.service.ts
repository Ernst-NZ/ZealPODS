import { IdbService } from '../_services/idb.service';
import { IDataBase, DATA_TYPE, ITable } from 'jsstore';
 export class BaseService {
  dbname = 'ZEDS_db';
  dbDelivery = 'dbZEDS';
  constructor() {
   // turn on jsstore log status - help you to debug
   // turn off it in production or when you dont need
   this.connection.setLogStatus(false);
   this.initJsStore();
  }
 get connection() {
   return IdbService.idbCon;
  }
 initJsStore() {
   this.connection.isDbExist(this.dbname).then(isExist => {
    if (isExist) {
     this.connection.openDb(this.dbname);
    } else {
     const dataBase = this.getDeliveryDb();
     this.connection.createDb(dataBase);
    }
   }).catch(err => {
    // this will be fired when indexedDB is not supported.
    alert(err.message);
   });
  }

  //  #### Get Deliveries
  private getDeliveryDb() {
    const tblDelivery: ITable = {
     name: 'Deliveries',
     columns: [{
       name: 'id',
       primaryKey: true,
       autoIncrement: true
      },
      {
       name: 'documentId',
       dataType: DATA_TYPE.Number
      },
      {
       name: 'delivered',
       dataType: DATA_TYPE.String,
       default: 'false',
      },
       {
         name: 'QuantityRejected',
         dataType: DATA_TYPE.Number
       },
       {
         name: 'RejectionReason',
         dataType: DATA_TYPE.String
       },
       {
         name: 'SignatureSVG',
         dataType: DATA_TYPE.String
       },
       {
         name: 'ReceivedBy',
         dataType: DATA_TYPE.String
       },
       {
         name: 'PaymentMethod',
         dataType: DATA_TYPE.String
       },
       {
         name: 'PaymentAmount',
         dataType: DATA_TYPE.Number
       },
       {
         name: 'json',
         dataType: DATA_TYPE.Object,
       }
     ]
    };
    const dataBase: IDataBase = {
     name: this.dbname,
     tables: [tblDelivery]
    };
    return dataBase;
   }
 }

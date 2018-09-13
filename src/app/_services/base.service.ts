import { IdbService } from '../_services/idb.service';
import { IDataBase, DATA_TYPE, ITable } from 'jsstore';
 export class BaseService {
//  dbname = 'Student_db';
  dbname = 'Delivery_db';
  dbDelivery = 'dbDelivery';
 // dbName = 'Delivery_db';
  constructor() {
   // turn on jsstore log status - help you to debug
   // turn off it in production or when you dont need
   this.connection.setLogStatus(true);
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
       name: 'lastSync',
       notNull: true,
       dataType: DATA_TYPE.String
      },
      {
       name: 'name',
       dataType: DATA_TYPE.String,
      },
      {
       name: 'documentId',
       notNull: true,
       dataType: DATA_TYPE.Number
      },
      {
       name: 'lineId',
       dataType: DATA_TYPE.Number,
       notNull: true
      },
      {
       name: 'qtyOrdered',
       dataType: DATA_TYPE.Number
      },
      {
       name: 'qtyRejected',
       dataType: DATA_TYPE.Number
      },
      {
       name: 'rejectReason',
       dataType: DATA_TYPE.String,
       notNull: true
      },
      {
       name: 'cash',
       dataType: DATA_TYPE.Number
      },
      {
       name: 'delivered',
       dataType: DATA_TYPE.String,
       notNull: true,
       default: 'false',
      },
      {
       name: 'deliveryTime',
       dataType: DATA_TYPE.String
      },
      {
       name: 'signature',
       dataType: DATA_TYPE.String
      },
      {
       name: 'updated',
       dataType: DATA_TYPE.String,
       notNull: true,
       default: 'false'
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

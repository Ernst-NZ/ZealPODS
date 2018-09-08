import { IdbService } from '../_services/idb.service';
import { IDataBase, DATA_TYPE, ITable } from 'jsstore';

 export class BaseService {
  dbname = 'Delivery_db';
  dbJson = 'JSON_db';
  dbName = 'db1';
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
     const dataBase = this.getDatabase();
     this.connection.createDb(dataBase);
    }
   }).catch(err => {
    // this will be fired when indexedDB is not supported.
    alert(err.message);
   });
   // ## DeliveryTest
  //  this.connection.isDbExist(this.dbDelivery).then(isExist => {
  //   if (isExist) {
  //    this.connection.openDb(this.dbDelivery);
  //   } else {
  //    const dataBase = this.getDatabase();
  //    this.connection.createDb(dataBase);
  //   }
  //  }).catch(err => {
  //   // this will be fired when indexedDB is not supported.
  //   alert(err.message);
  //  });

   // ####
   this.connection.isDbExist(this.dbName).then(isExist => {
    if (isExist) {
     this.connection.openDb(this.dbName);
    } else {
     const dataBase = this.getDatabase();
     this.connection.createDb(dataBase);
    }
   }).catch(err => {
    // this will be fired when indexedDB is not supported.
    alert(err.message);
   });

   // ## end
  }

  // ### Delivery get table
  private getDelivberyDB() {
    const tblDelivery: ITable = {
     name: 'Deliveries',
     columns: [{
       name: 'id',
       primaryKey: true,
       autoIncrement: true
      },
      {
       name: 'orderid',
       notNull: true,
       dataType: DATA_TYPE.Number,
      },
      {
       name: 'delivered',
       dataType: DATA_TYPE.Boolean,
       default: false,
      },
      {
       name: 'deliveryTime',
       dataType: DATA_TYPE.DateTime,
      },
      {
       name: 'signature',
       dataType: DATA_TYPE.String,
      },
      {
        name: 'lineID',
        dataType: DATA_TYPE.Boolean,
        notNull: true,
       },
       {
        name: 'rejectReason',
        dataType: DATA_TYPE.Boolean,
        notNull: true,
       },
       {
        name: 'quantityRejected',
        dataType: DATA_TYPE.Number,
        notNull: true,
        default: 0,
       },
      {
        name: 'updated',
        dataType: DATA_TYPE.Boolean,
        default: false,
       }
     ]
    };
    const dataBase: IDataBase = {
     name: this.dbname,
     tables: [tblDelivery]
    };
    return dataBase;
   }
   // ## end

 private getDatabase() {
   const tblStudent: ITable = {
    name: 'Students',
    columns: [{
      name: 'id',
      primaryKey: true,
      autoIncrement: true
     },
     {
      name: 'name',
      notNull: true,
      dataType: DATA_TYPE.String
     },
     {
      name: 'gender',
      dataType: DATA_TYPE.String,
      default: 'male'
     },
     {
      name: 'country',
      notNull: true,
      dataType: DATA_TYPE.String
     },
     {
      name: 'city',
      dataType: DATA_TYPE.String,
      notNull: true
     }
    ]
   };
   const dataBase: IDataBase = {
    name: this.dbname,
    tables: [tblStudent]
   };
   return dataBase;
  }
 }

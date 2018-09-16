// export class IStudent {
//   id?: number;
//   name: string;
//   gender: string;
//   country: string;
//   city: string;
// }

// export class Student implements IStudent {
//   id = 0;
//   name = '';
//   gender = 'm';
//   country = '';
//   city = '';
// }

// ## Delivery Stuff
export class IDelivery {
  id?: number;
  lastSync: string;
  name: string;
  documentId: number;
  lineId: number;
  qtyOrdered: number;
  qtyRejected: number;
  rejectReason: string;  
  delivered: string;
  deliveryTime: string;
  signature: string;
  deliveredTo: string;
  paymentMethod: string;
  paymentAmount: number;
  updated: string;
}

export class Delivery implements IDelivery {
  id: 0;
  lastSync: '';
  name: '';
  documentId: 0;
  lineId: 0;
  qtyOrdered: 0;
  qtyRejected: 0;
  rejectReason: '';
  delivered: '';
  deliveryTime: '';  
  signature: '';
  deliveredTo: '';
  paymentMethod: '';
  paymentAmount: 0;
  updated: '';
}
// ## End

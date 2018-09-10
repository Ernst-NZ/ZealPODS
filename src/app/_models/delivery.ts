export class IStudent {
  id?: number;
  name: string;
  gender: string;
  country: string;
  city: string;
}

export class Student implements IStudent {
  id = 0;
  name = '';
  gender = 'm';
  country = '';
  city = '';
}

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
  cash: number;
  delivered: string;
  deliveryTime: string;
  signature: string;
  updated: string;
}

export class Deliveryz implements IDelivery {
  id: 0;
  lastSync: '';
  name: '';
  documentId: 0;
  lineId: 0;
  qtyOrdered: 0;
  qtyRejected: 0;
  rejectReason: '';
  cash: 0;
  delivered: '';
  deliveryTime: '';
  signature: '';
  updated: '';
}
// ## End

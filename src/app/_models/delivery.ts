export class IStudent {
  id?: number;
  name: string;
  gender: string;
  country: string;
  city: string;
}

export class Delivery implements IStudent {
  id = 0;
  name = '';
  gender = 'm';
  country = '';
  city = '';
}

//## Delivery Stuff
export class IDelivery {
  id?: number;
  orderID: number;
  delivered: boolean;
  deliveryTime: string;
  signature: string;
  lineID: number;
  rejectReason: string;
  quantityRejected: number;
  updated: boolean;
}

export class Deliveryz implements IDelivery {
  id = 0;
  orderID: 0;
  delivered: false;
  deliveryTime: '';
  signature: '';
  lineID: 0;
  rejectReason: '';
  quantityRejected: 0;
  updated: false;
}
//## End 

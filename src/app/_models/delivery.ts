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
  paymentType: string;
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
  paymentType: '';
  paymentAmount: 0;
  updated: '';
}
// ## End

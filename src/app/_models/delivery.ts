export class IDelivery {
  id?: number;
  documentId: number;
  delivered: string;
  QuantityRejected: number;
  RejectionReason: string;
  SignatureSVG: string;  
  ReceivedBy: string;
  PaymentMethod: string;
  PaymentAmount: number;
  DriverNotes: string;
  updated: string;
  json: object;
}

export class Delivery implements IDelivery {
  id: 0;
  documentId: 0;
  delivered: 'false';
  QuantityRejected: 0;
  RejectionReason: '';
  SignatureSVG: '';
  ReceivedBy: '';
  PaymentMethod: '';
  PaymentAmount: 0;
  DriverNotes: '';
  updated: 'false';
  json: object;
}
// ## End

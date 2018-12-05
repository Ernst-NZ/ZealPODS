import { Component, OnInit, AfterContentChecked, Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { DeliveryService } from '../_services/delivery.service';
import { Delivery, IDelivery } from '../_models/delivery';
import { Globals } from '../globals';

export interface Reason {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-rejectproducts',
  templateUrl: './rejectproducts.component.html',
  styleUrls: ['./rejectproducts.component.scss'],
  providers: [DeliveryService]
})
export class RejectproductsComponent implements OnInit, AfterContentChecked {
  private service: DeliveryService;
  deliveries: Array<IDelivery> = [];
  //  newDelivery: IDelivery = new Delivery();
  oldDelivery: IDelivery = new Delivery();
  tempDelivery: IDelivery = new Delivery();
  model: any = {};
  oldItem: any = {};
  oldOrder: any = {};
  DriverNotes: string = '';
  dataset: any = {};
  addDB = false;

  reject: Reason[] = [
    { value: 'Customer Error', viewValue: 'Customer Error'},
    { value: 'Damaged Goods', viewValue: 'Damaged Goods'},
    { value: 'Not On Truck', viewValue: 'Not On Truck'},
    { value: 'Out of Date', viewValue: 'Out of Date'},
    { value: 'Picking Error', viewValue: 'Picking Error'},
    { value: 'Typing Error Description', viewValue: 'Typing Error Description'},
    { value: 'Typing Error Quantity', viewValue: 'Typing Error Quantity'},
    { value: 'Incorrect Stock', viewValue: 'Incorrect Stock'},
    { value: 'Pricing Issue', viewValue: 'Pricing Issue'},
    { value: 'Customer Didnt Want', viewValue: 'Customer Didnt Want'},
    { value: 'No Label/Date', viewValue: 'No Label/Date'},  
    { value: 'Did not Order', viewValue: 'Did not Order'},      
    { value: 'Rep Error', viewValue: 'Rep Error'},     
    { value: 'Value Credit', viewValue: 'Value Credit'},             
          

  ];
  productDetails$: Object;
  public lineID: number;
  public docID;
  public i: number;
  QuantityRejected: number;
  QuantityOrdered: number;
  Reason: string;
  public incomplete: boolean;

  constructor(private route: ActivatedRoute,
    private data: DataService, service: DeliveryService,
    private router: Router, private globals: Globals ) {
    this.route.params.subscribe(params => this.productDetails$ = params.DocumentId);
    this.service = service;
    this.incomplete = globals.incomplete;
  }

  ngOnInit() {
    //  this.data.getAllRoutes().subscribe(data => (this.productDetails$ = data));
    const getLine = (this.route.snapshot.paramMap.get('LineId'));
    this.i = getLine.lastIndexOf(',');
    this.docID = getLine.substring(0, this.i);
    this.lineID = Number(getLine.substring(this.i + 1));
    this.getJson();
  }

  ngAfterContentChecked() {
    if (this.deliveries.length > 0 && this.addDB === false) {
      this.addDB = true;
      this.dataset = this.tempDelivery.json;
      const drivers = this.dataset['orderGroups'];
      this.productDetails$ = this.tempDelivery.json;
       for (let d = 0; d < drivers.length; d++) {
        const orderList = drivers[d]['Orders'];
        for (let o = 0; o < orderList.length; o++) {
          // Get Document ID
          if (orderList[o].DocumentId === Number(this.docID)) {
            const productList = orderList[o]['Lines'];
            this.oldDelivery = orderList[o];
            this.oldOrder = orderList[o];
            for (let p = 0; o < productList.length; p++) {
              if (productList[p].LineId === Number(this.lineID)) {
                this.oldItem = productList[p];
                break;
              }
            }
          }
        }
      }
    }
  }

  // ## Get Json
  getJson() {
    this.service.getJsonFromDB()
      .then(deliveries => {
        this.deliveries = deliveries;
        if (deliveries.length > 0) {
          this.tempDelivery = deliveries[0];
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
  }

  updateDelivery() {
    if (this.oldItem.QuantityRejected > this.oldItem.QuantityOrdered || this.oldItem.QuantityRejected < 0) {
      return alert('Reject total can not be more than the Ordered total or less than zero.');
    }
    if (this.oldItem.RejectionReason === '') {
      return alert('Please provide a reason for rejection.');
    }
    this.globals.incomplete = true;
    this.service.preUpdateDelivery('product', 0,
      this.docID,
      this.lineID,
      'true',
      this.oldItem.QuantityRejected,
      this.oldItem.RejectionReason,
      this.oldOrder.SignatureSVG,
      this.oldOrder.ReceivedBy,
      this.oldOrder.PaymentMethod,
      this.oldOrder.PaymentAmount,
      this.DriverNotes,
      'false',
      this.productDetails$);
    // alert('Delivery Successfully updated');
    this.router.navigate(['/order-details/', this.docID]);
  }
}

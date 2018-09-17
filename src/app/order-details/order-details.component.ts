import { Component, OnInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DeliveryService } from '../_services/delivery.service';
import { Delivery, IDelivery } from '../_models/delivery';

export interface Payment {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  providers: [DeliveryService],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class OrderDetailsComponent implements OnInit {
  private service: DeliveryService;
  pay: Payment[] = [
    { value: 'nopay-0', viewValue: 'No Payment' },
    { value: 'cash-1', viewValue: 'Cash' },
    { value: 'cheque', viewValue: 'Cheque' }
  ];
  orderDetail$: Object;
  deliveries: Array<IDelivery> = [];
  oldDelivery: IDelivery = new Delivery();
  public docID;
  show = false;
  hidden = true;
  addDB = false;

  toggleTable() {
    this.show = !this.show;
    this.hidden = !this.hidden;
  }

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    service: DeliveryService
  ) {
    this.route.params.subscribe(
      params => (this.orderDetail$ = params.DocumentId)
    );
    this.service = service;
  }

  ngOnInit() {
    this.data.getAllRoutes().subscribe(data => (this.orderDetail$ = data));
    const getOrder = this.route.snapshot.paramMap.get('DocumentId');
    this.docID = getOrder;
    this.getOrder(Number(this.docID));
  }

  getOrder(documentId) {
    this.service
      .getOrder(documentId)
      .then(deliveries => {
        this.deliveries = deliveries;
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
  }

  clearOldDelivery() {
    this.oldDelivery = new Delivery();
  }

  updateDelivery() {
    if (this.oldDelivery.rejectReason == null) {
      return alert('Please provide a reason for rejection.');
    }

    if (this.oldDelivery.qtyRejected > this.oldDelivery.qtyOrdered) {
      return alert('Quantity Rejected can not be more than Quantity Ordered!');
      var signatureData = 'sig data'; //atob(dataSvg.split(',')[0]);
      var displayTime = new Date().toLocaleTimeString();
      var displayDate = new Date().toLocaleDateString();
      var newDate = displayDate.concat(displayTime); 
 
    }

    const updatedValue: IDelivery = {
      lastSync: this.oldDelivery.lastSync,
      name: this.oldDelivery.name,
      documentId: this.oldDelivery.documentId,
      lineId: this.oldDelivery.lineId,
      qtyOrdered: this.oldDelivery.qtyOrdered,
      qtyRejected: this.oldDelivery.qtyRejected,
      rejectReason: this.oldDelivery.rejectReason,
      delivered: 'true',
      deliveryTime: newDate,
      signature: signatureData,
      deliveredTo: this.oldDelivery.deliveredTo,
      paymentType: this.oldDelivery.paymentType,
      paymentAmount: this.oldDelivery.paymentAmount,
      updated: this.oldDelivery.updated
    };
    this.service
      .updateDelivery(this.oldDelivery.id, updatedValue)
      .then(rowsUpdated => {
        if (rowsUpdated > 0) {
          const index = this.deliveries.findIndex(
            delivery => delivery.id === this.oldDelivery.id
          );
          this.deliveries[index] = this.oldDelivery;
          this.clearOldDelivery();
          alert('Delivery Successfully updated');
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
  }
}

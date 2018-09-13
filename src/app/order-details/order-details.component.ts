import { Component, OnInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

// import { DeliveryService } from '../_services/delivery.service';
// import { Delivery, IStudent, IDelivery, Deliveryz } from '../_models/delivery';


export interface Payment {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
 // providers: [DeliveryService],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger('50ms',
              animate('550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })))
          ], { optional: true }),
        query(':leave', animate('50ms', style({ opacity: 0 })), { optional: true })
      ])
    ])
  ],

})
export class OrderDetailsComponent implements OnInit, AfterContentChecked {

 // private service: DeliveryService;
  pay: Payment[] = [
    { value: 'nopay-0', viewValue: 'No Payment' },
    { value: 'cash-1', viewValue: 'Cash' },
    { value: 'cheque', viewValue: 'Cheque' }
  ];
  orderDetail$: Object;
  public docID;
  show = false;
  hidden = true;
  addDB = false;

  toggleTable() {
    this.show = !this.show;
    this.hidden = !this.hidden;
  }

  constructor(private route: ActivatedRoute, private data: DataService) {
    this.route.params.subscribe(params => this.orderDetail$ = params.DocumentId);
  //  this.service = service;
  }

  ngOnInit() {
    this.data.getAllRoutes().subscribe(
      data => this.orderDetail$ = data,
    );
    const getOrder = (this.route.snapshot.paramMap.get('DocumentId'));
    this.docID = getOrder;
  }

  ngAfterContentChecked() {
      //  if (this.orderDetail$ !== this.docID && this.addDB === false) {
      //      this.service.getData(this.orderDetail$);
      //      }
         }


  // xxx() {
  //   this.service.AddStudentTest();

  // }
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService} from '../data.service';
import {trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

import { DeliveryService } from '../_services/delivery.service';
import { Delivery, IStudent, IDelivery, Deliveryz } from '../_models/delivery';


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
        query(':enter',
        [
          style({ opacity: 0, transform: 'translateY(-15px)'}),
          stagger('50ms',
          animate('550ms ease-out',
          style({opacity: 1, transform: 'translateY(0px)'})))
        ], {optional: true}),
        query(':leave', animate('50ms', style({ opacity: 0 })), {optional: true})
      ])
    ])
  ]
})
export class OrderDetailsComponent implements OnInit {

  ordergroups = [];

  private service: DeliveryService;
  newDelivery: IDelivery = new Deliveryz();
  deliveries: Array<IDelivery> = [];
  pay: Payment[] = [
    {value: 'nopay-0', viewValue: 'No Payment'},
    {value: 'cash-1', viewValue: 'Cash'},
    {value: 'cheque', viewValue: 'Cheque'}
  ];
  orderDetail$: Object;
  public docID;
  show = false;
  hidden = true;
  toggleTable() {
    this.show = !this.show;
    this.hidden = !this.hidden;
  }

  constructor(private route: ActivatedRoute, private data: DataService, service: DeliveryService) {
    this.route.params.subscribe( params => this.orderDetail$ = params.DocumentId );
    this.service = service;
 }

  ngOnInit() {
    this.data.getAllRoutes().subscribe(
      data => this.orderDetail$ = data,
    );
//    this.ordergroups = this.orderDetail$.ordergroups;
    const getOrder = (this.route.snapshot.paramMap.get('DocumentId'));
    this.docID = getOrder;

    // console.log('xxxxxxxxxx');
    // console.log(this.ordergroups);


    this.service.AddDelivery();

  }

  xxx() {
    alert('xxx');
    const pets = new Set(['Cat', 'Dog', 'Hamster']);
pets['species'] = 'mammals';

const array = [1, 2, 3];
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

  }

  }

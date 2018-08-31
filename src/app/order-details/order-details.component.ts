import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService} from '../data.service';
import {trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { Globals } from '../globals';
export interface Payment {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
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

  constructor(private route: ActivatedRoute, private data: DataService) {
    this.route.params.subscribe( params => this.orderDetail$ = params.DocumentId );
 }

  ngOnInit() {
    this.data.getAllRoutes().subscribe(
      data => this.orderDetail$ = data
    );
    const getOrder = (this.route.snapshot.paramMap.get('DocumentId'));
    this.docID = getOrder;
  }
  }

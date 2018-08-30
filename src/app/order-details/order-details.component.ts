import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService} from '../data.service';
import {trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { Globals } from '../globals';

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
          style({opacity:1, transform: 'translateY(0px)'})))
        ], {optional: true}),
        query(':leave', animate('50ms', style({ opacity: 0 })), {optional: true})
      ])
    ])
  ]    
})
export class OrderDetailsComponent implements OnInit {
  allRoutes$: object;
  public docID;

  constructor(private orderID: ActivatedRoute, private data: DataService, private globals: Globals) {
    this.orderID.params.subscribe( params => this.allRoutes$ = data);
   }

  ngOnInit() {
    this.data.getAllRoutes().subscribe(
      data => this.allRoutes$ = data
    )
    let getOrder =(this.orderID.snapshot.paramMap.get('DocumentId'));
        this.docID = getOrder;
        console.log("docID: " + this.docID)
  }

}
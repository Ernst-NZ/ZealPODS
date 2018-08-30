import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService} from '../data.service';
import { ActivatedRoute } from '@angular/router';
import {trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { Globals } from '../globals';

@Component({
  selector: 'app-route-orders',
  templateUrl: './route-orders.component.html',
  styleUrls: ['./route-orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
export class RouteOrdersComponent implements OnInit {

  allRoutes$: object;
  public selectedRoute: string;

  constructor(private route: ActivatedRoute, private data: DataService, private globals: Globals) {
    this.route.params.subscribe( params => this.allRoutes$ = data);
    this.selectedRoute = globals.selectedRoute;
   }

  ngOnInit() {
    this.data.getAllRoutes().subscribe(
      data => this.allRoutes$ = data
    )
    let getOrder =(this.route.snapshot.paramMap.get('routeName'));
    this.selectedRoute = getOrder;
    this.globals.selectedRoute = this.selectedRoute;
  }

}
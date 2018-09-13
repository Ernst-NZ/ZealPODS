import { Component, OnInit, ViewEncapsulation, AfterContentChecked} from '@angular/core';
import { DataService} from '../data.service';
import { ActivatedRoute } from '@angular/router';
import {trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { Globals } from '../globals';
import { DeliveryService } from '../_services/delivery.service';


@Component({
  selector: 'app-route-orders',
  templateUrl: './route-orders.component.html',
  styleUrls: ['./route-orders.component.scss'],
  providers: [DeliveryService],
  encapsulation: ViewEncapsulation.None,
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
export class RouteOrdersComponent implements OnInit, AfterContentChecked {

  allRoutes$: object;
  public selectedRoute: string;
  private service: DeliveryService;
  addDB = false;

  constructor(private route: ActivatedRoute, private data: DataService, private globals: Globals, service: DeliveryService) {
    this.route.params.subscribe( params => this.allRoutes$ = data);
    this.selectedRoute = globals.selectedRoute;
    this.service = service;
   }

  ngOnInit() {
    this.data.getAllRoutes().subscribe(
      data => this.allRoutes$ = data);
    const getOrder = (this.route.snapshot.paramMap.get('routeName'));
    this.selectedRoute = getOrder;
    this.globals.selectedRoute = this.selectedRoute;
  }

  ngAfterContentChecked() {
    if (typeof this.allRoutes$['orderGroups'] !== 'undefined' && this.addDB === false)  {
      console.log('xxxx');
      this.addDB = true;
      console.log(this.allRoutes$['orderGroups']);
      this.service.getData(this.allRoutes$, this.allRoutes$['orderGroups'][0].Name);
    }
       }
}

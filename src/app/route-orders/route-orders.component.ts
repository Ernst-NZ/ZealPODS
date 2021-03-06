import { Component, OnInit, ViewEncapsulation, AfterContentChecked } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { Globals } from '../globals';
import { DeliveryService } from '../_services/delivery.service';
import { Delivery, IDelivery } from '../_models/delivery';

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
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger('50ms',
              animate('550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })))
          ], { optional: true }),
        query(':leave', animate('50ms', style({ opacity: 0 })), { optional: true })
      ])
    ])
  ]
})
export class RouteOrdersComponent implements OnInit, AfterContentChecked {

  allRoutes$: object;
  public selectedRoute: string;
  private service: DeliveryService;
  addDB = false;
  deliveries: Array<IDelivery> = [];
  oldDelivery: IDelivery = new Delivery();
  loading = false;

  constructor(private route: ActivatedRoute, private data: DataService, private globals: Globals, service: DeliveryService) {
    this.route.params.subscribe(params => this.allRoutes$ = data);
    this.selectedRoute = globals.selectedRoute;
    this.service = service;
  }

  ngOnInit() {
    this.loading = true;
 //   this.data.getAllRoutes().subscribe(data => this.allRoutes$ = data);
    this.getJson();
    const getOrder = (this.route.snapshot.paramMap.get('routeName'));
    this.selectedRoute = getOrder;
    this.globals.selectedRoute = this.selectedRoute;
  }
  ngAfterContentChecked() {
    if (typeof this.deliveries[0] !== 'undefined' && this.addDB === false) {
      this.addDB = false;
        this.allRoutes$ = this.deliveries[0]['json'];
      }
    this.loading = false;
  }
  // ## Get Json
  getJson() {
    this.service
      .getJson()
      .then(deliveries => {
        this.deliveries = deliveries;
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
  }
}

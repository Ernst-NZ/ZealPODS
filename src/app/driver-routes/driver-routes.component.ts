import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';
import { DataService } from '../data.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DeliveryService } from '../_services/delivery.service';
import { Delivery, IDelivery } from '../_models/delivery';
import { Globals } from '../globals';

@Component({
  selector: 'app-driver-routes',
  templateUrl: './driver-routes.component.html',
  styleUrls: ['./driver-routes.component.scss'],
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
export class DriverRoutesComponent implements OnInit, AfterContentChecked {
  allRoutes$: object;
  addDB = false;
  addJson = false;
  pendingSync = false;
  private service: DeliveryService;
  deliveries: Array<IDelivery> = [];
  oldDelivery: IDelivery = new Delivery();
  tempDelivery: IDelivery = new Delivery();
  constructor(private data: DataService, service: DeliveryService, private globals: Globals, ) {
  this.service = service;
  }

  ngOnInit() {
    this.data.getAllRoutes().subscribe(data => (this.allRoutes$ = data));
    this.getJson();
    this.globals.incomplete = false;
  }

  ngAfterContentChecked() {
    if (typeof this.allRoutes$ !== 'undefined' && this.addDB === false) {
      if (this.deliveries.length > 0 && this.addDB === false) {
        this.addDB = true;
        if (this.tempDelivery.delivered === 'true') {
          this.pendingSync = true;
          this.addDB = true;
        }
      }
      this.checkJson();
      this.addDB = true;
    }
  }

  // ## Get Json
  getJson() {
    this.service.getJson()
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

  checkJson() {
    if (this.pendingSync === true && this.addJson === false) {
      this.service.postJson(this.allRoutes$);
      this.service.dbAdd(
        0, '', '', 0, 0,
        '', '', 0, 0, this.allRoutes$
      );
      this.addJson = true;

    } else {
      this.service.dbAdd(
        0, '', '', 0, 0,
        '', '', 0, 0, this.allRoutes$
      );
      this.addJson = true;
    }
  }
}

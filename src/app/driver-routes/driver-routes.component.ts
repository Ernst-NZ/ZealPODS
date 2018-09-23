import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';
import { DataService} from '../data.service';
import {trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DeliveryService } from '../_services/delivery.service';
import { Delivery, IDelivery } from '../_models/delivery';

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
  private service: DeliveryService;
  deliveries: Array<IDelivery> = [];
  oldDelivery: IDelivery = new Delivery();
  constructor(private data: DataService, service: DeliveryService) {
    this.service = service;
  }

  ngOnInit() {
    this.data.getAllRoutes().subscribe(data => (this.allRoutes$ = data));
    this.getJson();
    //   alert('Order Update - Look at rejected for update option. Update command needs to change.');
    //    alert('Look at data collection from db not web.');
  }

  ngAfterContentChecked() {
    if (this.deliveries.length > 0) {
      if (typeof this.deliveries[0]['id'] !== 'undefined') {
        this.allRoutes$ = this.deliveries[0]['json'];
        console.log(this.allRoutes$);
      }
    }
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

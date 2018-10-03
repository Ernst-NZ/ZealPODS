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
  addDB = false;
  private service: DeliveryService;
  deliveries: Array<IDelivery> = [];
  oldDelivery: IDelivery = new Delivery();
  constructor(private data: DataService, service: DeliveryService) {
    this.service = service;
  }

  ngOnInit() {
    this.data.getAllRoutes().subscribe(data => (this.allRoutes$ = data));
  }

  ngAfterContentChecked() {
    if (typeof this.allRoutes$ !== 'undefined' && this.addDB === false) {
      this.addDB = true;
      this.checkJson();
    }

  }

  checkJson() { 
    this.service
      .getIncompleteDeliveries()
    .then(deliveries => {
      if (deliveries.length > 0) {
        this.oldDelivery = deliveries[0];
      }
    }).catch(error => {
      console.error(error);
      alert(error.message);
    });
    if (this.deliveries.length < 1) {
  //    this.service.clearAll();
      this.service.dbAdd(
        0, '', '', 0, 0,
        '', '', 0, 0, this.allRoutes$
     );

 } else {
      
 }
  }


}

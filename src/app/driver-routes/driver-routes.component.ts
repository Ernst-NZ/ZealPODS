import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';
import { DataService } from '../data.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DeliveryService } from '../_services/delivery.service';
import { Delivery, IDelivery } from '../_models/delivery';
import { Globals } from '../globals';
import { NotifierService } from 'angular-notifier';
import { isFulfilled } from '../../../node_modules/@types/q';
import { timeout } from '../../../node_modules/rxjs/operators';

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
  allRoutesx$: object;
  addDB = false;
  addJson = false;
  loading = true;
  pendingSync = false;
  isOnline = false;
  emptyDatabase = false;
  getFromDB = false;
  private service: DeliveryService;
  deliveries: Array<IDelivery> = [];
  oldDelivery: IDelivery = new Delivery();
  tempDelivery: IDelivery = new Delivery();
  public notifier: NotifierService;
  constructor(private data: DataService, service: DeliveryService, private globals: Globals, notifier: NotifierService) {
    this.service = service;
    this.notifier = notifier;
  }

  // ngOnInit() {
  //   this.getJson();
  //   this.globals.incomplete = false;
  //   if (this.emptyDatabase && this.addDB === false) {
  //     this.data.getAllRoutes().subscribe(data => (this.allRoutes$ = data));
  //   }
  // }

  // ngAfterContentChecked() {
  //   if (typeof this.allRoutes$ !== 'undefined' && this.addDB === false) {
  //     if (this.deliveries.length > 0 && this.addDB === false) {
  //       this.addDB = true;
  //       if (this.tempDelivery.delivered === 'true') {
  //         this.pendingSync = true;
  //         this.addDB = true;
  //       }
  //     }
  //     this.checkJson();
  //     this.addDB = true;
  //   }
  // }

  // Karl on 13
  ngOnInit() {
    console.log('Getting Routes...');
    this.loading = true;
    this.data.getAllRoutes()
    .subscribe(
      data => {
           console.log('Successfully Got Routes');
        (
         this.allRoutes$ = data,
         this.loading = false,
         this.getFromDB = false
                  );
      },
     error => {
           console.log('Cannot Get Fresh, getting Cached Data');
           this.loading = false,
           this.getFromDB = true;
//           this.allRoutesx$ = this.data.getCachedData2();
      });
    // console.log('Finished getting routes')

    // console.log('Finished getting JSON')
    this.globals.incomplete = false;
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
    console.log(this.allRoutes$);
    if (this.getFromDB === true && this.addDB === false) {
      this.addDB = false;
      this.getFromDB = false;
      console.log('Getting Cached Results...');
      this.getJson();
      this.addDB = false;
      console.log(this.allRoutes$);
      this.checkJson();
    }
    if (typeof this.allRoutes$ !== 'undefined' && this.getFromDB === false && this.addDB === false) {
           if (this.deliveries.length > 0 && this.addDB === false) {
             this.addDB = true;
             if (this.tempDelivery.delivered === 'true') {
               this.pendingSync = true;
               this.addDB = true;
             }
           }
           console.log('checking Json');
           this.checkJson();
           this.addDB = true;
         }
  }





  // ngOnInit() {
  //   console.log('Getting Routes...');
  //   this.loading = true;
  //   this.data.getAllRoutes()

  //   .subscribe(
  //     data => {
  //       console.log('Successfully Got Routes');
  //       (this.allRoutes$ = data, this.loading = false);
  //     },
  //   error => {
  //     console.log('Error Getting Routes' + error),
  //     this.showNotification('error', error);
  //     console.log('Getting Cached Results...');
  //     this.getJson();
  //     console.log('Finished Getting Cached Results');
  //     this.allRoutes$ = this.deliveries[0];
  //     console.log(this.allRoutes$);
  //     console.log('Finished Setting Cached Results to allRoutes object');
  //   });
  //   // console.log('Finished getting routes')

  //   // console.log('Finished getting JSON')
  //   this.globals.incomplete = false;
  // }

  // ngAfterContentChecked() {
  //   console.log('ngAfterContentChecked');
  //   console.log(this.allRoutes$);
  //   if (typeof this.allRoutes$ !== 'undefined' && this.addDB === false) {
  //     if (this.deliveries.length > 0 && this.addDB === false) {
  //       this.addDB = true;
  //       if (this.tempDelivery.delivered === 'true') {
  //         this.pendingSync = true;
  //         this.addDB = true;
  //       }
  //     }
  //     console.log('checking Json');
  //     this.checkJson();
  //     this.addDB = true;
  //   }
  // }


  // ## Get Json
  getJson() {
    this.service.getJsonFromDB()
      .then(deliveries => {
        this.deliveries = deliveries;
        console.log('getJson: deliveries' + this.deliveries);
        if (deliveries.length > 0) {
          this.tempDelivery = deliveries[0];
          this.allRoutes$ = deliveries[0].json;
        } else {
          console.log('getJson: Emptying DB');
          this.emptyDatabase = true; }
      })
      .catch(error => {
        console.error('getJson: Error: ' + error);
        alert(error.message);
      });
  }

  checkJson() {

    // If there's a pending order and the JSON hasn't been updated
    //   post back to server
    //     on success
    //       do get orders
    //         on success
    //           'update indexDB
    //            this.service.dbAdd(
    //            0, '', '', 0, 0,
    //            '', '', 0, 0, this.allRoutes$
    //         on error - do nothing
    //     on error (offline)
    //       do nothing

    if (this.pendingSync === true && this.addJson === false) {
      console.log('driver-routes pendingSync = true && addJson = false');
      this.service.postJson(this.allRoutes$);
      this.service.dbAdd(
        0, '', '', 0, 0,
        '', '', 0, 0, this.allRoutes$);
    } if (this.pendingSync === false && this.addJson === false) {
      console.log('driver-routes pendingSync = False && addJson = false');
      console.log(this.allRoutes$);
      this.service.dbAdd(
          0, '', '', 0, 0,
          '', '', 0, 0, this.allRoutes$
        );
      } else {
        console.log('driver-routes pendingSync=' && this.pendingSync && ' addJson ' && this.addJson);
      // get fresh version from server as nothing has been updated.
      // console.log('getting fresh data');
      // console.log(this.pendingSync);
      // console.log(this.addJson);
      // console.log(this.allRoutes$);

      // this.service.dbAdd(
      //   0, '', '', 0, 0,
      //   '', '', 0, 0, this.allRoutes$
      // );
      this.addJson = true;
    }
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
}

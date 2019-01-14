import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Globals } from '../globals';
import { DataService } from '../data.service';
import { DeliveryService } from '../_services/delivery.service';
import { Delivery, IDelivery } from '../_models/delivery';
import { _getComponentHostLElementNode } from '@angular/core/src/render3/instructions';
import { Console } from '@angular/core/src/console';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [DeliveryService],
})
export class NavbarComponent implements OnInit {
  private service: DeliveryService;
  allRoutes$: object;
  deliveries: Array<IDelivery> = [];
  sync: Array<IDelivery> = [];
  tempDelivery: IDelivery = new Delivery();
  addDB = false;
  pendingSync = this.globals.pendingSync;
  addJson = false;
  currentUrl: String;
  status: String;


  constructor(private router: Router, public globals: Globals,
    service: DeliveryService, private data: DataService) {
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url);
    this.service = service;
  }

  ngOnInit() {
    this.service.checkForSync();
    if (this.globals.pendingSync) {
      this.status = "Sync !";
    } else {
      this.status = "Sync";
    }

  }

  toggleSync() {
    this.globals.isSyncing = !this.globals.isSyncing;
  }


  // refresh() {
  //   this.data.getAllRoutes().subscribe(data => (this.allRoutes$ = data));
  //   this.getJson();
  //   if (typeof this.tempDelivery !== 'undefined' && this.addDB === false) {
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
  //   console.log(this.tempDelivery);
  // }
  //  ## Get Json
  // getJson() {
  //   this.service.getJsonFromDB()
  //     .then(deliveries => {
  //       this.deliveries = deliveries;
  //       if (deliveries.length > 0) {
  //         this.tempDelivery = deliveries[0];
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       alert(error.message);
  //     });
  // }
  // checkJson() {
  //   if (this.pendingSync === true && this.addJson === false) {
  //     this.service.postJson(this.allRoutes$);
  //     this.service.dbAdd(
  //       0, '', '', 0, 0,
  //       '', '', 0, 0, this.allRoutes$
  //     );
  //     this.addJson = true;

  //   } else {
  //     this.service.dbAdd(
  //       0, '', '', 0, 0,
  //       '', '', 0, 0, this.allRoutes$
  //     );
  //     this.addJson = true;
  //   }
  // }


  doSyncWithPost() {
    this.service.getcurrenDB();
  }

  doSyncOnly() {
    this.service.GetNewOrders();
  }

  goToHome() {
    if (this.globals.incomplete === true) {
      if (confirm('You have unsaved changes. Are you sure you want to exit this delivery?')) {
      } else { this.router.navigate(['/']);}
     } else {
      this.router.navigate(['/']);
     }

  }

  homePage() {
    this.router.navigate(['/']);
  }

  goToRoutes() {
    if (this.globals.incomplete === true) {
      if (confirm('You have unsaved changes. Are you sure you want to exit this delivery?')) {
        this.router.navigate(['/route-Orders/', this.globals.selectedRoute]);
      } else {
        this.router.navigate(['/route-Orders/', this.globals.selectedRoute]);
      }
    } else {
      this.router.navigate(['/route-Orders/', this.globals.selectedRoute]);
    }
  }

}
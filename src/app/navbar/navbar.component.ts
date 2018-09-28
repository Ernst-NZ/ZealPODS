import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Globals } from '../globals';
import { DataService } from '../data.service';
import { DeliveryService } from '../_services/delivery.service';





@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [DeliveryService],
})
export class NavbarComponent implements OnInit {
  private service: DeliveryService;

  currentUrl: String;
  constructor(private router: Router, public globals: Globals,
    service: DeliveryService, private data: DataService) {
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url);
    this.service = service;
  }

  ngOnInit() {
  }

  postData() {
    this.data.postJson('123');

  }

}

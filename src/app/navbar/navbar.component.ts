import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Globals } from '../globals';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUrl: String;
  
  constructor(private router: Router, public globals: Globals) { 
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)

  }

  ngOnInit() {
  }

}
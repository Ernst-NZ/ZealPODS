import { Component, Input, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import {trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-driver-routes',
  templateUrl: './driver-routes.component.html',
  styleUrls: ['./driver-routes.component.scss'],
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
export class DriverRoutesComponent implements OnInit {

  allRoutes$: object;
  
  constructor(private data: DataService) { }


  ngOnInit() {
    this.data.getAllRoutes().subscribe(
      data => this.allRoutes$ = data)
  }
}
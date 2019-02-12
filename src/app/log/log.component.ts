import { Component, OnInit } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  constructor() { }
  
  ngOnInit() {
    
  }

  refreshLog() {
    
    console.log("Log Refreshed");
  }
  

}

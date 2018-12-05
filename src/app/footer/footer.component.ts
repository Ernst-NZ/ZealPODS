import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  
  constructor(private globals: Globals) {    
  }

  isSyncing = this.globals.isSyncing;

  ngOnInit() {
  }
  

  showVersion() {
    alert("ZEDS Version 1.0.48z1");
  }

}

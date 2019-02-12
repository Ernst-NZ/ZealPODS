import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  selectedRoute: string;
  incomplete: boolean;
  cWidth: number;
  driver: string;
  isSyncing: boolean = false;
  pendingSync: boolean = false;  
  CFSURL: string = "https://deliveryapi.completefoodservices.com.au:8095";
  TestURL: string = "https://test1.zealsystems.co.nz";
  SelectedURL: string = this.TestURL;
  PendingIcon: Boolean = false;
  RotatingIcon: Boolean = false;
  StationaryIcon: Boolean = false;
  //SelectedURL: string = this.CFSURL;
}

import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  selectedRoute: string;
  incomplete: boolean;
  cWidth: number;
  driver: string;
  isSyncing: boolean = false;
}

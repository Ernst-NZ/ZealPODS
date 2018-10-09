import { Component, OnInit } from '@angular/core';
import { toInteger } from '../../../node_modules/@ng-bootstrap/ng-bootstrap/util/util';

var windowWidth: number;

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss']
})
export class SignatureComponent implements OnInit {

  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': window.innerWidth - 50,
    'canvasHeight': window.innerHeight - 300,
    'penColor': 'white',
    'lineWidth': 2
  };

  constructor() { }

  ngOnInit() {
  }



}
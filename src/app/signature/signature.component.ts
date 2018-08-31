import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss']
})

export class SignatureComponent implements OnInit {

   @ViewChild(SignaturePad) signaturePad: SignaturePad;

   constructor() { }

   public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
     'minWidth': 5,
     'canvasWidth': 390,
     'canvasHeight': 100,
   };
    public signatureImage: string;

   drawComplete() {
     this.signatureImage = this.signaturePad.toDataURL();
     console.log(this.signatureImage);
   }

   drawClear() {
    this.signaturePad.clear();
  }
   ngOnInit() {
   }

 }

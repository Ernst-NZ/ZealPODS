import {Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import {SignaturePad } from 'angular2-signaturepad/signature-pad';
import {ActivatedRoute } from '@angular/router';
import {DataService} from '../data.service';
import {trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import {Globals } from '../globals';

@Component( {
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss']
})

export class SignatureComponent implements OnInit {

   @ViewChild(SignaturePad)signaturePad: SignaturePad;

   constructor() {}

   public signaturePadOptions: Object =  {// passed through to szimek/signature_pad constructor
     'minWidth': 0.5,
     'canvasWidth': 700,
     'canvasHeight': 100
   };
    public signatureImage: string;

   drawComplete() {
    if (this.signaturePad.isEmpty()) {
      return alert('Please provide a signature first.');
    }

      this.signatureImage = this.signaturePad.toDataURL();
    //  console.log(this.signatureImage);

    const dataSvg = this.signaturePad.toDataURL('image/svg+xml');
     console.log(atob(dataSvg.split(',')[1]));
   this.download(dataSvg, 'signature.svg');

   const dataJpeg = this.signaturePad.toDataURL('image/jpeg');
   this.download(dataJpeg, 'signature.jpg');

     const dataPng = this.signaturePad.toDataURL('image/png');
     this.download(dataPng, 'signature.png');

  //   console.log(dataPng);

   }

   download(dataURL, filename) {
    const blob = this.dataURLToBlob(dataURL);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    // a.style = 'display: none';
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
  }

  dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i ) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array],  {type: contentType });
  }

   drawClear() {
    this.signaturePad.clear();
  }
   ngOnInit() {
   }

 }

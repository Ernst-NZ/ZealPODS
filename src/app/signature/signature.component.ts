import {Component, ViewChild, OnInit, ElementRef, AfterViewInit }from '@angular/core'; 
import {SignaturePad }from 'angular2-signaturepad/signature-pad'; 
import {ActivatedRoute }from '@angular/router'; 
import {DataService}from '../data.service'; 
import {trigger, style, transition, animate, keyframes, query, stagger }from '@angular/animations'; 
import {Globals }from '../globals'; 

@Component( {
  selector:'app-signature', 
  templateUrl:'./signature.component.html', 
  styleUrls:['./signature.component.scss']
})

export class SignatureComponent implements OnInit {

   @ViewChild(SignaturePad)signaturePad:SignaturePad; 

   constructor() {}

   public signaturePadOptions:Object =  {// passed through to szimek/signature_pad constructor
'minWidth':0.5, 
     'canvasWidth':700, 
     'canvasHeight':100,
    'signaturePad.penColor' : "rgb(66, 133, 244)"
   }; 
    public signatureImage:string; 

   drawComplete() {
    if (this.signaturePad.isEmpty()) {
      return alert("Please provide a signature first."); 
    }

      this.signatureImage = this.signaturePad.toDataURL(); 
    //  console.log(this.signatureImage); 

    var dataSvg = this.signaturePad.toDataURL('image/svg+xml'); 
  //  console.log(atob(dataSvg.split(',')[0]));
   this.download(dataSvg, "signature.svg"); 

   var dataJpeg = this.signaturePad.toDataURL('image/jpeg'); 
   this.download(dataJpeg, "signature.jpg"); 
    
     var dataPng = this.signaturePad.toDataURL('image/png'); 
     this.download(dataPng, "signature.png"); 

  //   console.log(dataPng);

   }

   download(dataURL, filename) {
    var blob = this.dataURLToBlob(dataURL); 
    var url = window.URL.createObjectURL(blob); 
  
    let a = document.createElement("a"); 
    // a.style = 'display: none';
    a.href = url; 
    a.download = filename; 
  
    document.body.appendChild(a); 
    a.click(); 
  
    window.URL.revokeObjectURL(url); 
  }

  dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    var parts = dataURL.split(';base64,'); 
    var contentType = parts[0].split(":")[1]; 
    var raw = window.atob(parts[1]); 
    var rawLength = raw.length; 
    var uInt8Array = new Uint8Array(rawLength); 
  
    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i); 
    }
  
    return new Blob([uInt8Array],  {type:contentType }); 
  }

   drawClear() {
    this.signaturePad.clear(); 
  }
   ngOnInit() {
   }

 }

import {Component, OnInit, ViewChild, AfterContentChecked, AfterViewChecked, NgModule }from '@angular/core'; 
import {ActivatedRoute, Router }from '@angular/router'; 
import {DataService }from '../data.service'; 
import {trigger, style, transition, animate, keyframes, query, stagger }from '@angular/animations'; 
import {DeliveryService }from '../_services/delivery.service'; 
import {Delivery, IDelivery }from '../_models/delivery'; 
import {SignaturePad }from 'angular2-signaturepad/signature-pad'; 
import {SignaturePadModule } from 'angular2-signaturepad';
import { AppComponent } from '../app.component';
import { AutofillMonitor } from '../../../node_modules/@angular/cdk/text-field';



export interface Payment {
  value:string; 
  viewValue:string; 
}

@NgModule({
  declarations: [ ],
  imports: [ SignaturePadModule ],
  providers: [ ],
  bootstrap: [ AppComponent ],
})

@Component( {
  selector:'app-order-details', 
  templateUrl:'./order-details.component.html', 
  styleUrls:['./order-details.component.scss'], 
  providers:[DeliveryService], 
  animations:[
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter', 
          [
            style( {opacity:0, transform:'translateY(-15px)'}), 
            stagger(
              '50ms', 
              animate(
                '550ms ease-out', 
                style( {opacity:1, transform:'translateY(0px)'})
              )
            )
          ],  {optional:true }
        ), 
        query(':leave', animate('50ms', style( {opacity:0 })),  {
          optional:true
        })
      ])
    ])
  ]
})

// export class SignaturePadPage{
 
//   @ViewChild(SignaturePad) signaturePad: SignaturePad;
 
//   private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
//     'minWidth': 5,
//     'canvasWidth': 500,
//     'canvasHeight': 300
//   };
 

//   ngAfterViewInit() {
//     // this.signaturePad is now available
//     this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
//     this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
//   }
 
//   drawComplete() {
//     // will be notified of szimek/signature_pad's onEnd event
//     console.log(this.signaturePad.toDataURL());
//   }
 
//   drawStart() {
//     // will be notified of szimek/signature_pad's onBegin event
//     console.log('begin drawing');
//   }
// };



export class OrderDetailsComponent implements OnInit, AfterContentChecked {
  @ViewChild(SignaturePad)
  signaturePad:SignaturePad; 
  orderDetails$:Object; 
  allRoutes$:object; 
  deliveries:Array < IDelivery >  = []; 
  oldDelivery:IDelivery = new Delivery(); 
  tempDelivery:IDelivery = new Delivery(); 

  oldItem:any =  {}; 
  oldOrder:any =  {}; 
  dataset:any =  {};
  productList: any = {}; 

  json:Array < IDelivery >  = []; 
  tempJson:IDelivery = new Delivery(); 
  private service:DeliveryService; 
  public docID;
  public driver;
  public signatureImage:string; 
  public i:number; 
  forceView = false; 
  delivered = false;
  loading = false; 

  show = false; 
  hidden = true; 
  addDB = false; 
  pay:Payment[] = [ {value:'No Payment', viewValue:'No Payment'},  {value:'Cash', viewValue:'Cash'},  {value:'Cheque', viewValue:'Cheque'}
  ]; 

  public signaturePadOptions:Object =  {
    // passed through to szimek/signature_pad constructor
    minWidth:0.5, 
    canvasWidth: 490,
    canvasHeight:110, 
    canvasBackgroundColor:'white'
  }; 

    toggleTable() {
    this.forceView = true; 
    this.show =  ! this.show; 
    this.hidden =  ! this.hidden; 
  }

  constructor(
    private route:ActivatedRoute, 
    private data:DataService, 
    service:DeliveryService, 
    private router:Router
  ) {
    this.route.params.subscribe(
      params => (this.orderDetails$ = params.DocumentId)
    ); 
    this.service = service; 
  }

  ngOnInit() {
  //  this.data.getAllRoutes().subscribe(data => (this.orderDetails$ = data));
    const getOrder = this.route.snapshot.paramMap.get('DocumentId'); 
    this.docID = getOrder; 
    this.getJson(); 
  }

  ngAfterContentChecked() {
    if (this.deliveries.length > 0 && this.addDB === false) {
      this.addDB = true;
      this.dataset = this.tempDelivery.json;
      const drivers = this.dataset['orderGroups'];            
      this.orderDetails$ = this.tempDelivery.json;
      for (let d = 0; d < drivers.length; d++) {
        const orderList = drivers[d]['Orders'];
        this.driver = drivers[d].Name;
        for (let o = 0; o < orderList.length; o++) {
          // Get Document ID
          if (orderList[o].DocumentId === Number(this.docID)) {
            this.productList = orderList[o]['Lines'];
            const products = orderList[o]['Lines'];
            this.oldDelivery = orderList[o];
            this.oldOrder = orderList[o];
            this.oldItem = orderList[o];
            for (let p = 0; p < products.length; p++) {
              if (products[p].QuantityRejected > 0) {
                this.show = true;
                this.hidden = false;
                break
              }
            }
            break
          }
        }
        break
      }
    }
  }

  // ## Get Json
  // v2
  getJson() {
    this.service.getJson()
      .then(deliveries => {
        this.deliveries = deliveries;
        if (deliveries.length > 0) {
          this.tempDelivery = deliveries[0];
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);     
      });
  }
 
  // V2 Post data
  postData() {
    const SignatureSVG = this.signaturePad.toDataURL('image/svg+xml');
    console.log(SignatureSVG); 

    if (this.signaturePad.isEmpty()) {
      return alert('Please provide a signature first.'); 
    }
    if (this.oldOrder.ReceivedBy === '') {
      return alert('Please provide a Name.'); 
    }
    const newDate = JSON.stringify(new Date()); 
    
    try {
      this.i = 0; 
      for (let d = 0; d < this.productList.length; d++) {
        this.oldDelivery = this.deliveries[d]; 
        this.i = this.i + 1; 
        this.updateDelivery(
          // this.deliveries[d]['id'], 
          0,
          SignatureSVG, 
          newDate, 
          this.oldOrder.ReceivedBy, 
          this.oldOrder.PaymentMethod, 
          this.oldOrder.PaymentAmount,); 
      }
      alert('Delivery Successfully Updated');
      this.router.navigate(['/route-Orders/', this.driver]); 
    }catch (error) {
      alert(error); 
    }
  }

  clearOldDelivery() {
    this.oldDelivery = new Delivery(); 
  }

  // V2 Update
  updateDelivery(    
    Lineid,
    SignatureSVG, 
    newDate, 
    ReceivedBy, 
    PaymentMethod, 
    PaymentAmount) {
    this.loading = true;
    this.service.preUpdateDelivery( 'order', this.i,
      this.docID,
       Lineid,
       'true',
       this.oldOrder.QuantityRejected,
       this.oldOrder.RejectionReason,
       SignatureSVG,
       ReceivedBy,
       PaymentMethod,
       PaymentAmount,
      this.orderDetails$);
    this.loading = false;
  }
  drawClear() {
    this.signaturePad.clear(); 
  }

}
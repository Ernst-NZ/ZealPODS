import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { DeliveryService } from '../_services/delivery.service';
import { Delivery, IDelivery } from '../_models/delivery';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
  providers: [DeliveryService]
})

export class DeliveryComponent implements OnInit, AfterContentChecked {

  private service: DeliveryService;
  deliveries: Array<IDelivery> = [];
  newDelivery: IDelivery = new Delivery();
  oldDelivery: IDelivery = new Delivery();
  jsonFile$: object;
  getAddress$: object;
  public devAddress: string;
  id: number;
  lat: number;
  lng: number;
  zoom: number;
  locationChosen = false;
  // public origin: string;
  public origin: any;
  public destination: string;

  constructor(private route: ActivatedRoute, service: DeliveryService, private data: DataService) {
    this.route.params.subscribe(params => this.getAddress$ = data);
    this.service = service;
  }

  ngOnInit() {
    this.lat = -37.7729;
   this.lng = 176.7842;
    const getAddress = (this.route.snapshot.paramMap.get('devAddress'));
    this.devAddress = getAddress;
  // this.getDeliveries();
  // this.getJson();
  this.getLocation();  
  }
  ngAfterContentChecked() {

  }
 getLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
    this.zoom = 18;
   });
  }

  getDirection() {
 //   this.getLocation();
    this.origin = { lat: this.lat, lng: this.lng };
//   this.origin = '8 Amy Place, Pyes Pa, Tauranga';
   this.destination = this.devAddress;
  //  this.getLocation();
  //  this.origin = { lat: this.lat, lng: this.lng };
  //  this.destination = '8 Amy Place pyes Pa Tauranga';
  }

  onChooseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
    console.log(event);
  }

  test() {
    this.lat = -41.2829;
    this.lng = 174.7842;
    this.locationChosen = true;
  }

  test2() {
    this.lat = -41.2829;
    this.lng = 174.7842;
//    const destination = this.lat + ',' + this.lng;
// alert(this.devAddress);
    const destination = '11 Brown St,  Tauranga';
//    this.destination = this.devAddress;

// if ( this.platform.is('ios')) {
// 	window.open('maps://?q=' + destination, '_system');
// } else {
  const label = encodeURI('Destination');
    window.open('https://www.google.com/maps/place/' + this.devAddress + '_system');
// }
  }

  getOrder(documentId) {
    this.service.getOrder(documentId).
    then(deliveries => {
      this.deliveries = deliveries;
    }).catch(error => {
      console.error(error);
      alert(error.message);
    });
}

  // ## Get Json
  getJson() {
    this.service.getJsonFromDB().
      then(deliveries => {
        this.deliveries = deliveries;
      }).catch(error => {
        console.error(error);
        alert(error.message);
      });
  }

  // ## Get Deliveries
  getDeliveries() {
    this.service.getDeliveries().
      then(deliveries => {
        this.deliveries = deliveries;
      }).catch(error => {
        console.error(error);
        alert(error.message);
      });
  }

  // clearNewStudent() {
  //   this.newStudent = new Student();
  // }

  // deleteStudent(studentId) {
  //   this.service.deleteStudent(studentId).
  //     then(rowsDeleted => {
  //       if (rowsDeleted > 0) {
  //         const index = this.students.findIndex(student => student.id === studentId);
  //         this.students.splice(index, 1);
  //         alert('Successfully deleted');
  //       }
  //     }).catch(error => {
  //       console.error(error);
  //       alert(error.message);
  //     });
  // }

  // ## Clear Old Delivery
  clearOldDelivery() {
    this.oldDelivery = new Delivery();
  }

  // Get Delivery
  getDelivery(deliveryId) {
    this.service.getDelivery(deliveryId).
      then(deliveries => {
        if (deliveries.length > 0) {
          this.oldDelivery = deliveries[0];
        }
      }).catch(error => {
        console.error(error);
        alert(error.message);
      });
  }

  // // ## Update Delivery

  // updateDelivery() {
  //   const updatedValue: IDelivery = {
  //     lastSync: this.oldDelivery.lastSync,
  //     name: this.oldDelivery.name,
  //     documentId: this.oldDelivery.documentId,
  //     lineId: this.oldDelivery.lineId,
  //     QuantityOrdered: this.oldDelivery.QuantityOrdered,
  //     QuantityRejected: this.oldDelivery.QuantityRejected,
  //     RejectionReason: this.oldDelivery.RejectionReason,
  //     delivered: this.oldDelivery.delivered,
  //     deliveryTime: this.oldDelivery.deliveryTime,
  //     signature: this.oldDelivery.signature,
  //     deliveredTo: this.oldDelivery.deliveredTo,
  //     paymentType: this.oldDelivery.paymentType,
  //     paymentAmount: this.oldDelivery.paymentAmount,
  //     updated: this.oldDelivery.updated,
  //     json: this.oldDelivery.json
  //   };
  //   this.service.updateDelivery(this.oldDelivery.id, updatedValue).
  //     then(rowsUpdated => {
  //       if (rowsUpdated > 0) {
  //         const index = this.deliveries.findIndex(delivery => delivery.id === this.oldDelivery.id);
  //         this.deliveries[index] = this.oldDelivery;
  //         this.clearOldDelivery();
  //         alert('Delivery Successfully updated');
  //       }
  //     }).catch(error => {
  //       console.error(error);
  //       alert(error.message);
  //     });
  // }

xxx() {
//  this.service.getProduct(1965)
//  this.service.getNewData();


 // this.service.editJson('', 404, 1964, 777, 'Damaged', 'signature', 'Koos', 'Cash', 99.22)
}

  }



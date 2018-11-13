import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from './globals';
import { headersToString } from 'selenium-webdriver/http';
import {RequestOptions } from '@angular/http';
import {Headers } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  searchText: String = '';
  myToken: String = '';

  constructor(private http: HttpClient,
    private globals: Globals) { }

  getAllRoutes() {
  //  return this.http.get(this.globals.connectionString && '/api/values/1');
  //  return this.http.get(this.globals.connectionString);
   //  return this.http.get('https://deliveryapi.completefoodservices.com.au:8095/api/values/1');
    return this.http.get('https://test1.zealsystems.co.nz/api/values/1') ;

  }

  // getTestApiResult() {
  //   return this.http.get('https://localhost:5000/api/genras/');
  // }

// #####################################################################
  getAllRoutes1() {

    // let jsonString = 'Bearer ' + localStorage.getItem('JSONToken');
    // console.log('jsonString: ' + jsonString);

    // 'Content-Type': 'application/json',
    // const httpOptions = {headers: new HttpHeaders({
    //   'Accept': 'application/json, text/plain, */*',
    //   'Access-Control-Allow-Origin':'*'})};

    //   console.log(httpOptions);
    //   console.log(HttpHeaders);
    //   // console.log(httpOptions.headers.get('Authorization'));
    //   console.log('Authorization: ' + httpOptions.headers.get('Authorization'));
    // return this.http.get('http://test1.zealsystems.co.nz/api/values/1');

   // return this.http.get('https://deliveryapi.completefoodservices.com.au:8095/api/values/1');
  }



  // ###  111  #############
  postJson2(dataString) {
    console.log('Data Before Post 35');

    console.log('Test 1 Line 41');
    console.log(dataString);
    return this.http.post('https://test1.zealsystems.co.nz/api/values/', dataString, {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    });
  }


  // ######## 44  JQuery  #######
  // postJson4() {
  //   var person = {
  //     name: $('#id-name').val(),
  //     address: $('#id-address').val(),
  //     phone: $('#id-phone').val()
  //   }

  //   $('#target').html('sending..');
  //   console.log('44 Jquery');
  //   console.log(JSON.stringify(person));
  //   $.ajax({
  //     url: 'https://test1.zealsystems.co.nz/api/values',
  //     type: 'post',
  //     //dataType: 'json',
  //     //contentType: 'application/json',
  //     //    ,
  //     data: JSON.stringify(person)
  //   }).done(function () {
  //     alert('second success');
  //   })
  //     .fail(function (e) {
  //       console.log(e)
  //       alert(e);
  //     });

    // $.post('https://test1.zealsystems.co.nz/api/values', JSON.stringify(person), function (data) {
    //   console.log('success callback');
    //   console.log(data);
    // })
    // .done(function(data){
    //   console.log('done');
    //   console.log(data);
    // })
    //   .fail(function (data) {
    //     console.log('failed');
    //   });
    // console.log('45 Jquery');
 // }



  // ### 222 #############
  postJson(dataString) {
    console.log('Data Before Post 35');
    console.log('Test 2 Line 91');
    this.myToken = localStorage.getItem('JSONToken');
    console.log(this.myToken);
  }

    //   const httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type': 'application/json'
    //       , 'Access-Control-Allow-Origin': '*'
    //       //    , 'Access-Control-Allow-Origin': '*'

    //     });
    //   };

    // }

    //   const httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type': 'application/json'
    //       , 'Access-Control-Allow-Origin': '*'
    //       //    , 'Access-Control-Allow-Origin': '*'
    //     })
    //   };
    // }



      // ### 33 #############
      postJson3(dataString) {
        console.log('Test 3 Line 122');
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');


        }

// ########################################################################


getCachedData1() {
  const open = indexedDB.open('ZEDS_db', 1);
  let gotJsonString;


  open.onupgradeneeded = function() {
    const db = open.result;
    const store = db.createObjectStore('DeliveryStore', { keyPath: 'id' });
    // const store = db.createObjectStore('Students', { keyPath: 'id' });
    // const index = store.createIndex('LineIndex', ['lineID']);
  };

  open.onsuccess = function() {
    // Start a new transaction
    const db = open.result;
    const tx = db.transaction('Deliveries', 'readwrite');
    const store = tx.objectStore('Deliveries');
    console.log('here');
    //   const tx = db.transaction('Students', 'readwrite');
    //   const store = tx.objectStore('Students');
    //    var index = store.index('NameIndex');
    gotJsonString = store.get(0);
    gotJsonString.onsuccess = function() {
      console.log('results below: ');
      console.log(gotJsonString.result);
      console.log('ready to return');
      return gotJsonString.result;
    };

    // Close the db when the transaction is done
    tx.oncomplete = function() {
      db.close();
    };
    return gotJsonString.results;
};
}

getCachedData2() {

return {
  'User': 'xxx@##########.co.nz',
  'LastSyncronisation': '2018-11-13T17:01:11.5443649+13:00',
  'orderGroups': [
    {
      'Name': 'JIMMY_AM',
      'DeliveryDate': '2018-11-13T00:00:00+13:00',
      'Orders': [
        {
          'DocumentId': 423,
          'CustomerCode': 'COLLIER',
          'CustomerName': 'Collier & Sons Limited',
          'DeliveryAddress1': '',
          'DeliveryAddress2': '',
          'DeliveryAddress3': '',
          'DeliveryAddress4': '',
          'PostCode': '',
          'PhoneNo': '04-556 7890',
          'Subtitle': '',
          'PackingSlipNo': '',
          'OrderNo': '146',
          'DocumentDate': '2018-11-12T00:00:00',
          'Category1': '',
          'Category2': 'JIMMY_AM',
          'Lines': [
            {
              'LineId': 2463,
              'ProductCode': 'OVALMIRROR',
              'Description': 'Oval Mirror framed in Rimu',
              'CostPrice': 42,
              'SellPrice': 68,
              'QuantityOrdered': 1,
              'Accepted': true,
              'RejectionReason': '',
              'QuantityRejected': 0
            }
          ],
          'ExclusiveAmount': 6910.03,
          'SignatureSVG': '',
          'Delivered': false,
          'DeliveryTime': '2018-11-13T00:00:00+13:00',
          'ReceivedBy': '',
          'PaymentMethod': '',
          'PaymentAmount': 0,
          'Updated': false
        }
      ]
    }
  ]
};
}
}

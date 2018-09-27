import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import * as $ from 'jquery';
// declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  searchText: String = '';
  myToken: String = ''; 


  constructor(private http: HttpClient) { }

  getUser(userId) {
    return this.http.get('https://jsonplaceholder.typicode.com/users/' + userId);
  }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users' );
  }

  getPosts() {
    return this.http.get('https://newsapi.org/v2/sources?apiKey=4b3758d2803a4ea8bb066ec648fd14ba');
  }

  getAllRoutes() {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //     , 'Authorization': 'Bearer aRA39yf4N8J-DhTNCVRXptKywROwFCi6meGgAhafP9SGy96ReXmnwZYNTkqA_-vHcYOtNLgk0wCKTw1gkFfWj8S8A6j073XCcHeqlW7R-ahC3jOQ70iRcINbOsVsUWHqQ-YRi5u6bUZz9ECWruJ6vsIymMqBj9Lvk839h-9-F3iKQjOvXBmIA1j3ymGpO-FeuiXeQ3OnGxuUjWCCg6faVARQplX00GjoEgW1fgOJkvOxqgGlV5zWFUxfYh-oMlRfLSx7z4ZSm-OCKEmI5CIV1zzFodwp6n_mMrWy5AeOD0cu2mdDHBlqEp1E72s16Wi2liVW0dCcmoozZyJ0lhEy4SD-3_tkjW3-ShlZdCZ1niaIL5D6NBXeN1YeLFiEPGwYnmTV2j6f6PM9jUKCR9EWDODJejgVV8iDyAGFHuNDaO5IInQSzLyDCPmRq3QNeCTRuFV4tB0CJ1_Okj8wxkFdRg0jqU3o9oFq5_szZ47sV3tz-U2lIb0OFXl4kz-oWDpz'
    //     , 'Access-Control-Allow-Origin': '*'
    //   })
    // };
    // return this.http.get('https://test1.zealsystems.co.nz/api/values/1',httpOptions);
    return this.http.get('https://test1.zealsystems.co.nz/api/values/1');
  }

  getTestApiResult() {
    return this.http.get('https://localhost:5000/api/genras/');
  }

  // ###  111  #############
  postJson(dataString) {
    
    console.log("Test 1 Line 41")
    console.log(dataString)
    return this.http.post('https://test1.zealsystems.co.nz/api/values', dataString)
      .subscribe(
        val => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        }
      );
  }


  // ######## 44  JQuery  #######
  postJson4() {
    var person = {
      name: $("#id-name").val(),
      address: $("#id-address").val(),
      phone: $("#id-phone").val()
    }

    $('#target').html('sending..');
console.log("44 Jquery");
    console.log(JSON.stringify(person));
    $.ajax({
      url: 'https://test1.zealsystems.co.nz/api/values',
      type: 'post',
      //dataType: 'json',
      //contentType: 'application/json',
  //    Authorization: 'Bearer aRA39yf4N8J-DhTNCVRXptKywROwFCi6meGgAhafP9SGy96ReXmnwZYNTkqA_-vHcYOtNLgk0wCKTw1gkFfWj8S8A6j073XCcHeqlW7R-ahC3jOQ70iRcINbOsVsUWHqQ-YRi5u6bUZz9ECWruJ6vsIymMqBj9Lvk839h-9-F3iKQjOvXBmIA1j3ymGpO-FeuiXeQ3OnGxuUjWCCg6faVARQplX00GjoEgW1fgOJkvOxqgGlV5zWFUxfYh-oMlRfLSx7z4ZSm-OCKEmI5CIV1zzFodwp6n_mMrWy5AeOD0cu2mdDHBlqEp1E72s16Wi2liVW0dCcmoozZyJ0lhEy4SD-3_tkjW3-ShlZdCZ1niaIL5D6NBXeN1YeLFiEPGwYnmTV2j6f6PM9jUKCR9EWDODJejgVV8iDyAGFHuNDaO5IInQSzLyDCPmRq3QNeCTRuFV4tB0CJ1_Okj8wxkFdRg0jqU3o9oFq5_szZ47sV3tz-U2lIb0OFXl4kz-oWDpz'
  //    ,
      data: JSON.stringify(person)
    }).done(function () {
      alert("second success");
    })
      .fail(function (e) {
        console.log(e)
        alert(e);
      });

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
    // console.log("45 Jquery");
  }



// ### 222 #############
  postJson2(dataString) {
    console.log("Test 2 Line 91")
    this.myToken = localStorage.getItem('JSONToken');
    console.log(this.myToken);

    console.log(dataString)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
    //    , 'Authorization': 'Bearer aRA39yf4N8J-DhTNCVRXptKywROwFCi6meGgAhafP9SGy96ReXmnwZYNTkqA_-vHcYOtNLgk0wCKTw1gkFfWj8S8A6j073XCcHeqlW7R-ahC3jOQ70iRcINbOsVsUWHqQ-YRi5u6bUZz9ECWruJ6vsIymMqBj9Lvk839h-9-F3iKQjOvXBmIA1j3ymGpO-FeuiXeQ3OnGxuUjWCCg6faVARQplX00GjoEgW1fgOJkvOxqgGlV5zWFUxfYh-oMlRfLSx7z4ZSm-OCKEmI5CIV1zzFodwp6n_mMrWy5AeOD0cu2mdDHBlqEp1E72s16Wi2liVW0dCcmoozZyJ0lhEy4SD-3_tkjW3-ShlZdCZ1niaIL5D6NBXeN1YeLFiEPGwYnmTV2j6f6PM9jUKCR9EWDODJejgVV8iDyAGFHuNDaO5IInQSzLyDCPmRq3QNeCTRuFV4tB0CJ1_Okj8wxkFdRg0jqU3o9oFq5_szZ47sV3tz-U2lIb0OFXl4kz-oWDpz'
    //    , 'Access-Control-Allow-Origin': '*'
      })
    };


    return this.http.post<any>('https://test1.zealsystems.co.nz/api/values', dataString, httpOptions)
      .subscribe(val => {
        console.log("PUT call successful value returned in body", val);
      },
        response => {
          console.log("PUT call in error", response);
        },
        () => {
          console.log("The PUT observable is now completed.");
        }
      );

  }

  // ### 33 #############
  postJson3(dataString) {
    console.log("Test 3 Line 122")
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    
    this.http.post("https://test1.zealsystems.co.nz/api/values/",
      dataString,
      { headers })
      .subscribe(
        val => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        }
      );
  }



}

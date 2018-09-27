import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

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
    return this.http.get('https://test1.zealsystems.co.nz/api/values/1');
  }

  getTestApiResult() {
    return this.http.get('https://localhost:5000/api/genras/');
  }

  // ###  111  #############
  postJson(dataString) {
    console.log('Data Before Post 35')
    console.log(dataString)
    return this.http.post('https://test1.zealsystems.co.nz/api/values/', dataString, {
      headers: new HttpHeaders({
        'content-type': 'application/json'        
      })      
    })
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

// ### 222 #############
  postJson2(dataString) {
    console.log('Data Before Post 35')
    this.myToken = localStorage.getItem('JSONToken');
    console.log(this.myToken);

    console.log(dataString)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        , 'Authorization': 'Bearer 5m7lk9e5cMrMlMBNPGkRjLiZXCTqxPjJb2z7fenczHwJeJhvYGmNzPO6ldKgynAGPU-ct2rGy1NtxWaRgBza26-y3ffqdr3Whk8XEBWXoJUk8cFnPmsO0_CLVI6F-qHIl2I0sA1V8Z8TUBBoTqEV2haya_PXvR_YP_TfCYG1GjiUoRLmUei9VqjwhxRFDtVaUm4Ow2aYqXuYCtOg86wXFZJmPn4H5rOCLxpn-iup2FH0RLnFNo6Cp7C-i1Q4d8ld3xT3mIkX5Yq0Bb1noCd9zjxKJg0yAdaRi8JVkm7m3zRkp4C7XdtwzWPYUstsrRDFePLOeFug7bQJIJDXkbX3VhhecMPdtkcVeZwuqyCOjRbKFbYVOi5JRNEq4EUhg0IplscIkEC181c5b_UyXaElXlzS1RdErWQkl_CAZvHLRJl93U_itxSDAz-xSeRQj0zQsYgyXJEWFSFDjhkGEVx-SV559WOmX2dgJ0_wMQPK3bub3pCDdGO0Ykjdj60taPDv'
        , 'Access-Control-Allow-Origin': '*'
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  searchText: String = '';

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

  postJson(dataString) {
    return this.http.post('https://test1.zealsystems.co.nz/api/values/1', dataString, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })      
    })
    .pipe(catchError(err => {
      console.log('err');
      console.log(err);
      console.log('Error on Post: ' + err);
      alert('Error on Post: ' + err)      
      throw 'Error on Post: ' + err;      
    }))  
  }

}

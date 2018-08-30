import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  searchText:String = "";
  
  constructor(private http: HttpClient) { }

  getUser(userId) {
    return this.http.get('http://jsonplaceholder.typicode.com/users/'+userId)
  }
  
  getUsers() {
    return this.http.get('http://jsonplaceholder.typicode.com/users')
  }

  getPosts() {
    return this.http.get('https://newsapi.org/v2/sources?apiKey=4b3758d2803a4ea8bb066ec648fd14ba')
    //return this.http.get('http://jsonplaceholder.typicode.com/posts')
  }

  getAllRoutes() {
    return this.http.get('http://test1.zealsystems.co.nz/api/values/1')
  }

  getTestApiResult() {
    return this.http.get('http://localhost:5000/api/genras/')
  }

}

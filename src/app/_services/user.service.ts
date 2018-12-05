import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models/user';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        //return this.http.get<User[]>('https://deliveryapi.completefoodservices.com.au:8095/api/values/1');
        return this.http.get<User[]>(`https://test1.zealsystems.co.nz/api/values/1`);
        
    }
}
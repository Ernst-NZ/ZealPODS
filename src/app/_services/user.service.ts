import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models/user';
import { Globals } from '../globals';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient,
            private globals: Globals) { }

    getAll() {
        return this.http.get<User[]>(this.globals.connectionString);
      //  return this.http.get<User[]>(`https://test1.zealsystems.co.nz/api/values/1`);
    }
}
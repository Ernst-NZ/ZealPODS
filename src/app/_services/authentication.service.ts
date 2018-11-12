import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private globals: Globals) { }

    login(username: string, password: string) {
        console.log(this.globals.connectionString && '/token')
        // tslint:disable-next-line:max-line-length
            return this.http.post<any>(this.globals.connectionToken, 'username=' + username + '&password=' + password + '&grant_type=password')
                //return this.http.post<any>('https://test1.zealsystems.co.nz/token', 'username=' + username + '&password=' + password + '&grant_type=password')        
                .map(JSONObject => {
                    // login successful if there's a jwt token in the response
                    if (JSONObject) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('JSONToken', JSON.stringify(JSONObject.access_token));
                    }
                    return JSONObject;
                });     

    }

    logout() {
        // remove user from local storage to log user out
        console.log("Clearing Token");
        localStorage.removeItem('JSONToken');
        this.globals.selectedRoute = '';
    }


}

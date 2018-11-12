import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isNull } from 'util';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        
        let JSONToken = localStorage.getItem('JSONToken');       
        if (JSONToken != null)  {
            JSONToken = JSONToken.slice(1,-1);
            // console.log("sliced: " + JSONToken)
            if (JSONToken && JSONToken) {
              request = request.clone({
                   setHeaders: { 
                        Authorization: `Bearer ${JSONToken}`
                 }
              });
          }
        }

        return next.handle(request);
    
    }
}
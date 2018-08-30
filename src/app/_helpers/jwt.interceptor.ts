import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let JSONToken = JSON.parse(localStorage.getItem('JSONToken'));
        if (JSONToken && JSONToken.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${JSONToken.token}`
                }
            });
        }

        return next.handle(request);
    }
}
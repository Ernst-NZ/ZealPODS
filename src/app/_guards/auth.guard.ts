import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('JSONToken')) {
            // logged in so return true
            console.log("Can Activate");
            return true;
        }

        // not logged in so redirect to login page with the return url
        console.log("Unable to Activate");
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
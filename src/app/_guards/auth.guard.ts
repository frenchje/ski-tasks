import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { };

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    if(localStorage.getItem('currentUser')) {
      //logged in so return true
      return true;
    }

    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url }});
    return false;
  }
}

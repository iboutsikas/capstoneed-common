import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authenticationService';
import { Injectable } from '@angular/core';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate{

  constructor(private authService: AuthenticationService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.authService.isLoggedIn$;
  }

}

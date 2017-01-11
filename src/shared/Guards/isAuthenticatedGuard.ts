import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authenticationService';
import { Injectable } from '@angular/core';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate{

  constructor(private authService: AuthenticationService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    // if(this.authService.isLoggedIn)
    //   return true;
    //
    // if(state.url === '/') {
    //   this.router.navigate(['/home']);
    //   return false;
    // }
    //
    // if(this.authService.isAuthenticationPending) {
    //   this.authService.isLoggedIn$.skip(1).take(1).subscribe(value => {
    //     if(!value)
    //       this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    //       return value;
    //   });
    // } else {
    //   this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    //   return false;
    // }

    return true;
  }

}

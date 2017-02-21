import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';
import { Injectable } from '@angular/core';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate{

  constructor(private authService: AuthenticationService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    if(this.authService.isLoggedIn)
      return Observable.of(true);

    if(state.url === '/') {
      this.router.navigate(['/home']);
      return false;
    }

    if(this.authService.isAuthenticationPending) {
      return this.authService.isAuthenticationPending$
        .filter(value => value == false)
        .switchMap(value => {
          if(!this.authService.isLoggedIn)
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return this.authService.isLoggedIn$;
        });
        // this.authService.isLoggedIn$);
    }
  }

}

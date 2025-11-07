import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AithGuardService implements CanActivate {

authServi = inject(AuthService);
router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    console.log({route , state});
    const userRol = this.authServi.getRoles();
    const expectedRole = route.data['role'];

    return this.authServi.isLooggedIn.pipe(
      map((isLooggedIn: string )=> {
        if(isLooggedIn==''){
          this.router.navigate(['/login'])
          return false;
        }

        const userRoles = localStorage.getItem('rol');
      if(expectedRole && !expectedRole.includes(userRol!)){
        this.router.navigate(['/inicio']);
        return false;
      }

        return true;
      }
    )
    )
  }
  
}

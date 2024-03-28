import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

  constructor(
      private authService: AuthService,
      private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authService.getUser();
    if (user && user.role) {
      const expectedRoles:string[] = route.data['expectedRoles'];

      if(expectedRoles.includes(user.role)){
        return true;
      }else{
        this.router.navigate(['user-management/auth/login']);
        return false;
      }
    }else {
        this.router.navigate(['user-management/auth/login']);
        return false;
    }
  }
  
}

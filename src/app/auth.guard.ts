import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router : Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let url: string = state.url;  
      return this.verifyLogin(url);
  }

  verifyLogin(url) : boolean{
      if(!this.isLoggedIn()){
          this.router.navigate(['/login']);
          return false;
      }
      else if(this.isLoggedIn()){
          return true;
      }
  }
  public isLoggedIn(): boolean{
      let status = false;
      if( localStorage.getItem('isLoggedIn') == "true"){
        status = true;
      }
      else{
        status = false;
      }
      return status;
  }

  // constructor(public auth: AuthService) {}
 
  // canActivate(): boolean {
  //   return this.auth.isAuthenticated();
  // }
}

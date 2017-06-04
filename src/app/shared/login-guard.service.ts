import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import { LoginService } from "./login.service";

@Injectable()
export class LoginGuard {
    constructor(private loginService: LoginService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.loginService.isLoggedIn) {
            return true;
        } 
        
        else if (!this.loginService.isLoggedIn) {
            this.loginService.redirectUrl = state.url;
            this.router.navigate(["/login"]);
            return false;
        } 
    }
}


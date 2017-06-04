import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/login.service';
import { Router, ActivatedRoute, Params, RouterStateSnapshot } from "@angular/router";
import './rx-js.operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser;
  isIn = false;   
    toggleState() { 
        let bool = this.isIn;
        this.isIn = bool === false ? true : false; 
    }

  constructor(private loginServ: LoginService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }


  public login() {
    if (this.router.routerState.snapshot.url != "/login") this.loginServ.redirectUrl = this.router.routerState.snapshot.url;
    else this.loginServ.redirectUrl = "/home";
    window.scrollTo(0, 0);
    this.router.navigate(["/login"]);
  }

  public logout() {
    this.loginServ.logout();
    window.scrollTo(0, 0);
    this.router.navigate(["/home"])
  }

  public admin() {
    window.scrollTo(0, 0);
    this.router.navigate(["/admin"]);
  }
  
  public signUp() {
    if (this.router.routerState.snapshot.url != "/login") this.loginServ.redirectUrl = this.router.routerState.snapshot.url;
    else this.loginServ.redirectUrl = "/home";
    window.scrollTo(0, 0);
    this.router.navigate(["/signup"]);
  }
}

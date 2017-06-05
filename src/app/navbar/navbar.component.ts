import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { Router, ActivatedRoute, Params, RouterStateSnapshot } from "@angular/router";
import '../rx-js.operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser;
  isIn = false;
  toggleState() {
    let bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }

  constructor(public loginService: LoginService, public router: Router, public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.loginService.getLoggedUserProfile().subscribe(profile => {
      this.loginService.loggedUser = profile.user;
    },
      err => {
        return false;
      });
  }

  test() {
    console.log(this.loginService.loggedIn());
  }


  public login() {
    if (this.router.routerState.snapshot.url != "/login") this.loginService.redirectUrl = this.router.routerState.snapshot.url;
    else this.loginService.redirectUrl = "/home";
    window.scrollTo(0, 0);
    this.router.navigate(["/login"]);
  }

  public logout() {
    this.loginService.logout();
    window.scrollTo(0, 0);
    this.router.navigate(["/home"])
  }

  public admin() {
    window.scrollTo(0, 0);
    this.router.navigate(["/admin"]);
  }

  public signUp() {
    if (this.router.routerState.snapshot.url != "/login") this.loginService.redirectUrl = this.router.routerState.snapshot.url;
    else this.loginService.redirectUrl = "/home";
    window.scrollTo(0, 0);
    this.router.navigate(["/signup"]);
  }
}
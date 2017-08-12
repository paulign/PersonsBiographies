import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { User } from '../shared/user';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class LoginService {
  private url = "/api/users";
  redirectUrl: string;
  authToken: any;
  loggedUser: User;
  userAvatar: string = "./src/app/images/user.png";

  constructor(private http: Http) { }

  public login(currentUser) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let user = this.http.post(this.url + "/authenticate", currentUser, { headers: headers })
      .map(response => response.json());
    return user;
  }

  public addUser(newUser) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let user = this.http.post(this.url + "/register", newUser, { headers: headers })
      .map(res => res.json());
    return user
  }

  public getLoggedUserProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + "/profile", { headers: headers })
      .map(res => res.json());
  }

  public storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.loggedUser = user;
  }

  loadToken() {
    if (localStorage.getItem('id_token')) {
      const token = localStorage.getItem('id_token');
      this.authToken = token;
    }
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    this.authToken = null;
    this.loggedUser = null;
    localStorage.clear();
  }

  private handleError(error: any, cought: Observable<any>): any {
    let message = "";

    if (error instanceof Response) {
      let errorData = error.json().error || JSON.stringify(error.json());
      message = `${error.status} - ${error.statusText || ''} ${errorData}`
    } else {
      message = error.message ? error.message : error.toString();
    }

    console.error(message);

    return Observable.throw(message);
  }



}

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { User } from '../shared/user';
import { UserResponsed } from '../shared/userResponsed'


@Injectable()
export class LoginService {
  private url = "/users";
  isLoggedIn: boolean = false;
  redirectUrl: string;
  loggedUser: User;
  loggedUserResponsed: UserResponsed;
  userAvatar: string = "src/app/images/user.png";

  constructor(private http: Http) { }

  public login(currentUser): Observable<UserResponsed> {
    let user = this.http.post(this.url + "/authenticate", currentUser)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      })
      .catch(this.handleError);
    return user;
  }

  public logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('currentUser');
  }

  public getUser(_id): Observable<User> {
    let user = this.http.get(this.url + "/" + _id)
      .map(this.extractUser)
      .catch(this.handleError);
    return user;
  }

  public getUsers(): Observable<[User]> {
    let users = this.http.get(this.url, this.jwt())
      .map(this.extractUsers)
      .catch(this.handleError)
    return users
  }

  public addUser(newUser) {
    let user = this.http.post(this.url + "/register", newUser, this.jwt())
    return user
  }

  public updateUser(currentUser: User) {
    let user = this.http.post(this.url + "/" + currentUser._id, currentUser, this.jwt())
    return user
  }

  public deleteUser(user: User) {
    return this.http.delete(this.url + "/" + user._id, this.jwt())
  }

  private extractUser(response: Response) {
    let res = response.json();
    let user = res;
    return user;
  }

  private extractUsers(response: Response) {
    let res = response.json();
    let users: User[] = [];
    for (let i = 0; i < res.length; i++) {
      users.push(new User(res[i].username, res[i]._id));
    }
    return users;
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

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }

}

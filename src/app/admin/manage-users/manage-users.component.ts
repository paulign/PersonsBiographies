import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginService } from "../../shared/login.service";
import { User } from '../../shared/user';



@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
  users: User[];
  errorMessage: string;

  constructor(private loginServ: LoginService, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.loginServ.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => this.errorMessage = error
    );
  }

  private deleteUser(user){
    this.loginServ.deleteUser(user).subscribe(
      () => {
        this.getUsers();
      },
      error => {
        this.errorMessage = error;
      }
    )
  }

  public getUser(selected: User) {
    window.scrollTo(0, 0);
    console.log(selected._id)
    this.router.navigate(["admin/users", selected._id]);
  }

  goToList() {
    window.scrollTo(0, 0);
    this.router.navigate(["/persons"]);
  }

}

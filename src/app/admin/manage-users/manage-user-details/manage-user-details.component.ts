import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from '../../../shared/user';
import { LoginService } from '../../../shared/login.service';
import { SortPipe } from '../../../shared/sort.pipe';

@Component({
  selector: 'app-manage-user-details',
  templateUrl: './manage-user-details.component.html',
  styleUrls: ['./manage-user-details.component.css']
})
export class ManageUserDetailsComponent {

  user: User;
  errorMessage: string;
  userAvatar = this.loginServ.userAvatar;
  
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginServ: LoginService) { }

  /*ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"];
      this.getUser(id);
    });
  }

  private getUser(id) {
    this.loginServ.getUser(id)
      .subscribe(
      user => this.user = user,
      error => this.errorMessage = error
      );
  }

    public editPerson(person: Person) {
      window.scrollTo(0, 0);
      this.router.navigate(["admin", "persons", person.id]);
    }

  private deleteUser(user) {
    this.loginServ.deleteUser(user).subscribe(
      () => {
        this.goToList();
      },
      error => {
        this.errorMessage = error;
      }
    )
  }

  private goToList() {
    window.scrollTo(0, 0);
    this.router.navigate(["/admin/users"]);
  }*/

}

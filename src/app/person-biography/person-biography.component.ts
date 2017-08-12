import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { BiographiesService, Person, LoginService, SortPipe } from "../index";


@Component({
  selector: 'app-person-biography',
  templateUrl: './person-biography.component.html',
  styleUrls: ['./person-biography.component.css']
})
export class PersonBiographyComponent implements OnInit {

  person: Person;
  errorMessage: string;
  constructor(public router: Router,
    public activatedRoute: ActivatedRoute,
    public biographiesService: BiographiesService, public loginService: LoginService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["id"];
    if (id) {
      this.getPerson(id)
    }
  }

  private getPerson(id) {
    this.biographiesService.getPerson(id)
      .subscribe(
      person => this.person = person,
      error => this.errorMessage = error
      );
  }

  public editPerson(person: Person) {
    window.scrollTo(0, 0);
    this.router.navigate(["admin", "persons", person._id]);
  }

  private deletePerson(person) {
    this.biographiesService.deletePerson(person).subscribe(
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
    this.router.navigate(["/persons"]);
  }

}

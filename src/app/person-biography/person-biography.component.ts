import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { BiographiesService } from "../shared/biographies.service";
import { Person } from '../shared/person';
import { LoginService } from '../shared/login.service';
import { SortPipe } from '../shared/sort.pipe';


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

  public deletePerson(person) {
    this.biographiesService.deletePerson(person).subscribe(
      () => {
        this.goToList();
      },
      error => {
        this.errorMessage = error;
      }
    )
  }

  public goToList() {
    window.scrollTo(0, 0);
    this.router.navigate(["/persons"]);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BiographiesService } from "../shared/biographies.service";
import { Person } from '../shared/person'
import { LoginService } from '../shared/login.service';


@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent {
  persons: Person[];
  searchForm: FormGroup;
  searchValue = "";
  errorMessage: string;

  constructor(public service: BiographiesService, public loginServ: LoginService, public fb: FormBuilder,
    public router: Router) { }

  ngOnInit() {
    this.refresh();
  }

  private getPersons() {
    this.service.getPersons().subscribe(
      persons => {
        this.persons = persons;
      },
      error => this.errorMessage = error
    );
  }

  private buildForm() {
    this.searchForm = this.fb.group({
      searchValue: [""]
    });
  }

  public refresh() {
    this.buildForm();
    this.getPersons();
  }

  public getBiography(selected: Person) {
    window.scrollTo(0, 0);
    this.router.navigate(["persons/" + selected._id]);
  }

  public search() {
    if (this.searchForm.value.searchValue) {
      this.service.getPersons().subscribe(persons => this.persons = this.service.searchPerson(persons, this.searchForm.value.searchValue));
    }
    else this.getPersons();
  }

    public editPerson(person: Person) {
    window.scrollTo(0, 0);
    this.router.navigate(["admin", "persons", person._id]);
  }

  private deletePerson(person) {
    this.service.deletePerson(person).subscribe(
      () => {
        this.refresh();
      },
      error => {
        this.errorMessage = error;
      }
    )
  }

  public login() {
    this.router.navigate(["/login"]);
  }

  public logout() {
    this.loginServ.logout();
  }

  public admin() {
    this.router.navigate(["/admin"]);
  }

}

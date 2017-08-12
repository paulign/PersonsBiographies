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
  searchValue: string = "";
  errorMessage: string;

  constructor(public biographiesService: BiographiesService, public loginService: LoginService, public fb: FormBuilder,
    public router: Router) { }

  ngOnInit() {
    this.refresh();
  }

  private refresh() {
    this.buildForm();
    this.getPersons();
  }

  private getPersons() {
    this.biographiesService.getPersons().subscribe(
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

  private getBiography(selected: Person) {
    window.scrollTo(0, 0);
    this.router.navigate(["persons/" + selected._id]);
  }

  public search() {
    if (this.searchForm.value.searchValue) {
      this.biographiesService.getPersons().subscribe(persons => this.persons = this.biographiesService.searchPerson(persons, this.searchForm.value.searchValue));
    }
    else this.getPersons();
  }

  public editPerson(person: Person) {
    window.scrollTo(0, 0);
    this.router.navigate(["admin", "persons", person._id]);
  }

  public deletePerson(person) {
    this.biographiesService.deletePerson(person).subscribe(
      () => {
        this.refresh();
      },
      error => {
        this.errorMessage = error;
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BiographiesService } from "../../shared/biographies.service";
import { Person } from '../../shared/person'


@Component({
  selector: 'app-manage-persons',
  templateUrl: './manage-persons.component.html',
  styleUrls: ['./manage-persons.component.css']
})
export class ManagePersonsComponent {
  currentPerson: Person;
  errorMessage: string;
  personForm: FormGroup;
  steps: Array<{}> = [];
  year;
  event;

  constructor(public biographiesService: BiographiesService,
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router) { }

  ngOnInit() {
    this.buildForm();
    this.getPersonFromRoute();
  }

  public checkError(element: string, errorType: string) {
    return this.personForm.get(element).hasError(errorType) &&
      this.personForm.get(element).touched
  }

  public onSubmit(personForm: FormGroup) {
    this.currentPerson.fullName = personForm.value.fullName;
    this.currentPerson.title = personForm.value.title;
    this.currentPerson.quote = personForm.value.quote;
    this.currentPerson.photoSrc = personForm.value.photoSrc;
    this.currentPerson.wikiLink = personForm.value.wikiLink;
    this.currentPerson.steps = [];

    if (this.currentPerson._id) {
      this.currentPerson.steps = this.currentPerson.steps.concat(this.steps);
      this.biographiesService.updatePerson(this.currentPerson)
        .subscribe(
        () => this.goToList(),
        error => this.errorMessage = error
        );
    } else {
      this.currentPerson.steps = this.currentPerson.steps.concat(this.steps);
      this.biographiesService.addPerson(this.currentPerson)
        .subscribe(
        () => this.goToList(),
        error => this.errorMessage = error
        );
    }
  }

  private getPersonFromRoute() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"];

      if (id) {
        this.biographiesService.getPerson(id).subscribe(
          person => {
            this.currentPerson = person;
            if (this.currentPerson.photoSrc == this.biographiesService.defaultPhotoSrc) {
              this.currentPerson.photoSrc = null;
            }
            this.personForm.patchValue(this.currentPerson);
            this.steps = person.steps;
          },
          error => this.errorMessage = error
        );
      }
      else {
        this.currentPerson = new Person(null, null, null, null, null, null, null);
        this.personForm.patchValue(this.currentPerson);
      }
    });
  }

  private buildForm() {
    this.personForm = this.fb.group({
      fullName: ["", Validators.required],
      title: [""],
      quote: [""],
      photoSrc: [""],
      wikiLink: [""],
    });
  }

  private goToList() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"];

      if (id) {
        window.scrollTo(0, 0);
        this.router.navigate(["/persons/" + id]);
      }
      else {
        window.scrollTo(0, 0);
        this.router.navigate(["/persons"]);
      }
    });
  }

  private addStep(year, event) {
    let step = { year: null, event: null };
    step.year = year;
    step.event = event;
    this.steps.push(step);
    this.year = null;
    this.event = null;
  }

  private deleteStep(index) {
    this.steps.splice(index, 1);
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


}
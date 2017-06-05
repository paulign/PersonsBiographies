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

  constructor(public service: BiographiesService,
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
      this.service.updatePerson(this.currentPerson)
        .subscribe(
        () => this.goToList(),
        error => this.errorMessage = error
        );
    } else {
      this.currentPerson.steps = this.currentPerson.steps.concat(this.steps);
      this.service.addPerson(this.currentPerson)
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
        this.service.getPerson(id).subscribe(
          person => {
            this.currentPerson = person;
            if (this.currentPerson.photoSrc == this.service.defaultPhotoSrc) {
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

  goToList() {
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

  addStep(year, event) {
    let step = { year: null, event: null };
    step.year = year;
    step.event = event;
    this.steps.push(step);
    this.year = null;
    this.event = null;
  }


}
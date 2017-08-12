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
  person: Person;
  errorMessage: string;
  personForm: FormGroup;
  editMode: boolean;
  steps: Array<{}> = [];
  year: number;
  event: string;

  constructor(public biographiesService: BiographiesService,
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router) { }

  ngOnInit() {
    this.buildForm();
    this.getPersonFromRoute();
  }

  private getPersonFromRoute() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"];

      if (id) {
        this.biographiesService.getPerson(id).subscribe(
          person => {
            this.person = person;
            if (this.person.photoSrc == this.biographiesService.defaultPhotoSrc) {
              this.person.photoSrc = null;
            }
            this.personForm.patchValue(this.person);
            this.steps = person.steps;
          },
          error => this.errorMessage = error
        );
        this.editMode = true;
      }
      else {
        this.person = new Person(null, null, null, null, null, null, null);
        this.personForm.patchValue(this.person);
        this.editMode = false;
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

  public onSubmit(personForm: FormGroup) {
    this.person.fullName = personForm.value.fullName;
    this.person.title = personForm.value.title;
    this.person.quote = personForm.value.quote;
    this.person.photoSrc = personForm.value.photoSrc;
    this.person.wikiLink = personForm.value.wikiLink;
    this.person.steps = [];

    this.person.steps = this.person.steps.concat(this.steps);

    if (this.person._id) {
      this.biographiesService.updatePerson(this.person)
        .subscribe(
        () => this.goToList(),
        error => this.errorMessage = error
        );

    } else {
      this.biographiesService.addPerson(this.person)
        .subscribe(
        () => this.goToList(),
        error => this.errorMessage = error
        );
    }
  }

  private deletePerson(person) {
    this.biographiesService.deletePerson(person).subscribe(
      () => {
        this.router.navigate(["/persons"]);
      },
      error => {
        this.errorMessage = error;
      }
    )
  }

  public checkError(element: string, errorType: string) {
    return this.personForm.get(element).hasError(errorType) &&
      this.personForm.get(element).touched
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

}
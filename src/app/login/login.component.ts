import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from '../shared/user';
import { LoginService } from '../shared/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: User;
  errorMessage: string;
  loginForm: FormGroup;

  formErrors = {
    "username": "",
    "password": ""
  };

  validationMessages = {
    "username": {
      "required": "Required field."
    },
    "password": {
      "required": "Required field.",
      "minlength": "Min lengths is 3 symbols"
    }
  };

  constructor(private service: LoginService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  onValueChange(data?: any) {
    if (!this.loginForm) return;
    let form = this.loginForm;

    for (let field in this.formErrors) {
      this.formErrors[field] = "";
      let control = form.get(field);

      if (control && control.dirty && !control.valid) {
        let message = this.validationMessages[field];
        for (let key in control.errors) {
          this.formErrors[field] += message[key] + " ";
        }
      }
    }
  }

  public doLogin() {
    this.currentUser = this.loginForm.value
    this.service.login(this.currentUser)
      .subscribe(
      user => {
        this.service.isLoggedIn = true;
        this.goNext();
      },
      error => this.errorMessage = "Error: Incorrect login or password. Try again!"
      );

  }

  private goNext() {
    let redirect = this.service.redirectUrl ? this.service.redirectUrl : "/home";
    window.scrollTo(0, 0);
    this.router.navigate([redirect]);
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      "username": ["", Validators.required],
      "password": ["", [Validators.required, Validators.minLength(3)]]
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }
}

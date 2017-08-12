import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { User } from '../shared/user';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  currentUser: User;
  errorMessage: string;
  signUpForm: FormGroup;
  formErrors = {
    "username": "",
    "password": "",
    "password2": ""
  };

  validationMessages = {
    "username": {
      "required": "Required field."
    },
    "password": {
      "required": "Required field.",
      "minlength": "Min lengths is 3 symbols",
    },
    "password2": {
      "required": "Required field.",
      "confirmPasswordValidator": "The passwords are different"
    }

  };

  constructor(private loginService: LoginService,
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.signUpForm = this.fb.group({
      "username": ["", Validators.required],
      "password": ["", [Validators.required, Validators.minLength(3)]],
      "password2": ["", [Validators.required, Validators.minLength(3)]]
    }, {
        validator: this.confirmPasswordValidator("password", "password2")
      });

    this.signUpForm.valueChanges
      .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }

  private confirmPasswordValidator(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ confirmPasswordValidator: true })
      }
    }
  }

  private onValueChange(data?: any) {
    if (!this.signUpForm) return;
    let form = this.signUpForm;

    for (let field in this.formErrors) {
      this.formErrors[field] = "";
      let control = form.get(field);
      let control2 = form;

      if (control && control.dirty && !control.valid) {
        let message = this.validationMessages[field];
        for (let key in control.errors) {
          this.formErrors[field] += message[key] + " ";
        }
      }

    }
  }

  public doSignUp() {
    this.loginService.addUser(this.signUpForm.value)
      .subscribe(
      data => {
        console.log(data);
        if(data.success){
        this.goNext();
      }
      else {
        this.errorMessage = "Error: Something was wrong. Try again!"
      }
      });
  }

  private goNext() {
    let redirect = this.loginService.redirectUrl ? this.loginService.redirectUrl : "/home";
    window.scrollTo(0, 0);
    this.router.navigate([redirect]);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '../../../node_modules/@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MainService } from '../main.service';
import { Router } from '../../../node_modules/@angular/router';

let passwordMatchValidator = function (fg: FormGroup) {
  if (fg.get('password').value === fg.get('password_confirmation').value) {
    return null;
  } else {
    fg.get('password_confirmation').setErrors({ 'mismatch': true });
  }
  return { 'mismatch': true };
};


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;
  errors;
  inProgress = true;

  constructor(
    private fb: FormBuilder,
    private api: MainService,
    private router: Router
  ) { }

  ngOnInit() {
    this.regForm = this.fb.group({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, CustomValidators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      'password_confirmation': new FormControl('', [ Validators.minLength(4), Validators.maxLength(20)]),
    }, passwordMatchValidator);
  }

  createAccount(e, v) {
    this.inProgress = true;
    this.api.register(v).subscribe((res: any) => {
      alert('Registration Successful.');
      this.router.navigate(['login']);
    }, err => {
      if (err.error && err.error.errors) {
        let errors = err.error.errors;
        let errorProps = Object.keys(errors);
        let formatedErrors = [];
        for (let prop of errorProps) {
            formatedErrors.push(errors[prop]);
        }
        console.log(formatedErrors);
        this.errors = formatedErrors;
      }
      alert('Registration failed.');
    });
  }

}

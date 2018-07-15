import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { MainService } from '../main.service';
import { Router } from '../../../node_modules/@angular/router';
import { CustomValidators } from '../../../node_modules/ng2-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: MainService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': new FormControl('', [Validators.required, CustomValidators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
    });
  }

  login(e, v) {
    this.api.login(v).subscribe((res: any) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      window.location.href = '/';
    }, err => {
      alert('Login failed');
    });
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '../../node_modules/@angular/router';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  searchStr = '';
  searchForm: FormGroup;
  user;
  loggedIn = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: MainService
  ) {
    this.searchForm = formBuilder.group({
      'searchStr': [null, Validators.required]
    });

    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.loggedIn = true;
    }
  }

  search() {
    this.router.navigate(['search', this.searchForm.get('searchStr').value]);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    this.api.logout();
    this.loggedIn = false;
  }
}

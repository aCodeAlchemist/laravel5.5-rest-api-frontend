import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  searchStr = '';
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.searchForm = formBuilder.group({
      'searchStr': [null, Validators.required]
    });
  }

  search() {
    this.router.navigate(['search', this.searchForm.get('searchStr').value]);
  }
}

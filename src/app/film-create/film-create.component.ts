import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { MainService } from '../main.service';
import { Router } from '../../../node_modules/@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-film-create',
  templateUrl: './film-create.component.html',
  styleUrls: ['./film-create.component.css']
})
export class FilmCreateComponent implements OnInit {
  createForm: FormGroup;
  inProgess = false;
  countries;

  constructor(private fb: FormBuilder,
    private api: MainService,
    private router: Router,
    private http: HttpClient
  ) {
    if (!localStorage.getItem('user')) {
      router.navigate(['login']);
    }

    this.getCountries();
  }

  ngOnInit() {
    this.createForm = this.fb.group({
      'name': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required]),
      'release_date': new FormControl('', [Validators.required]),
      'rating': new FormControl('1'),
      'ticket_price': new FormControl('', [Validators.required]),
      'country': new FormControl('', [Validators.required]),
      'genre': new FormControl('', [Validators.required]),
      'photo': new FormControl('', [Validators.required])
    });
  }

  getCountries() {
    this.http.get('/assets/countries.json').subscribe((res: any) => {
      this.countries = res.result;
      this.createForm.get('country').setValue(this.countries[0].name);
      console.log(res);
    });
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year, month, day].join('-');
  }

  createFilm(e, v) {
    this.inProgess = true;
    v.release_date = this.formatDate(v.release_date);
    this.api.filmCreate(v).subscribe((res: any) => {
      this.router.navigate(['films']);
    });
  }

}

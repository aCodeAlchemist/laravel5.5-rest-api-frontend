import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  pagination = {
    total: 0,
    currentPage: 1,
    limit: 1
  };

  records = [];
  inProgress = true;

  constructor(
    private api: MainService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getFilms();
  }

  getFilms() {
    setTimeout(() => {
      this.api.films({page: this.pagination.currentPage}).subscribe((res: any) => {
        this.pagination.total = res.total;
        this.records = res.data;
        console.log('Films >> ', res);
        this.inProgress = false;
      });
    }, 100);
  }

  onPageChanged() {
    this.getFilms();
  }

  goToDetails(slug) {
    this.router.navigate(['films', slug]);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { MainService } from '../main.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {

  slug;
  data;
  commentForm: FormGroup;
  user;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: MainService,
    private fb: FormBuilder,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.slug = params.filmSlug;
      this.getDetails();
    });

    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  ngOnInit() {
    this.commentForm = this.fb.group({
      'comment': new FormControl('', [Validators.required])
    });
  }

  getDetails() {
    this.api.filmDetails(this.slug).subscribe((res: any) => {
      this.data = res;
    });
  }

  comment(e, v) {
    let reqData = {
      film_id: this.data.id,
      user_id: this.user.id,
      comment: v.comment
    };

    this.api.comment(reqData).subscribe((res: any) => {
      res.user = this.user;
      this.data.comments.push(res);
      this.commentForm.get('comment').setValue('');
    }, err => {
      alert('Failed posting comment.');
    });
  }
}

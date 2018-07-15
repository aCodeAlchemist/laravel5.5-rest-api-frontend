import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private api: ApiService
  ) { }

  login(params) {
    return this.api.post('/login', params);
  }

  logout() {
    return this.api.post('/logout', {});
  }

  register(params) {
    return this.api.post('/register', params);
  }

  films(params) {
    return this.api.get('/films', params);
  }

  filmDetails() {

  }

  filmCreate() {

  }
}

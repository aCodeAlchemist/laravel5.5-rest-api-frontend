import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class ApiService {
  private url = 'http://localhost:8000/api';

  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, options?: any) {
    let getUrl = (endpoint.indexOf('http') > -1) ? endpoint : (this.url + endpoint);
    if (!options) {
      options = {};
    }

    // Support easy query params for GET requests
    let p = new HttpParams();
    if (params) {
      for (let k in params) {
        p = p.append(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.params = p;
    }

    return this.http.get(getUrl, {params: p}).catch(this.catchErrors());
  }

  post(endpoint: string, body: any, options?: any) {
    if (!options) {
      options = {};
    }

    return this.http.post(this.url + endpoint, body, options).catch(this.catchErrors());
  }


  private catchErrors() {

    return (res: Response) => {

      if (res.status === 401 || res.status === 403) {
        // console.log('redirecting to main.');
      }
      return Observable.throw(res);
    };
  }
}

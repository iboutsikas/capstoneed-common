import {
  Http, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response,
  RequestMethod, Headers,
} from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BASE_URL } from '../Constants/settings';
@Injectable()
export class CustomHttp extends Http {

  public xsrf_token: string;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }
  crequest(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    options = this.prepareHeaders(options);
    options = this.appendXsrf(options);

    return super.request(url, options)
      .do(res => {
        let token = res.headers.get('XSRF-TOKEN');
        if (token) {
          this.xsrf_token = token;
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          return this.sendRefreshRequest(new RequestOptions(options))
            .switchMap(refreshResponse => {
              this.appendXsrf(options);
              return super.request(url, options);
            });
        }
        return Observable.throw(err); // throw all other errors. We dont care about them so far
      });
  }

  get(url: string, options: RequestOptionsArgs = { }): Observable<Response> {
    options.method = RequestMethod.Get;
    return this.crequest(url, options);
  }

  post(url: string, body:any, options: RequestOptionsArgs = { }): Observable<Response> {
    options.method = RequestMethod.Post;
    options.body = body;
    return this.crequest(url, options);
  }

  put(url: string, body:any, options: RequestOptionsArgs = { }): Observable<Response> {
    options.method = RequestMethod.Put;
    options.body = body;
    return this.crequest(url, options);
  }

  patch(url: string, body:any, options: RequestOptionsArgs = { }): Observable<Response> {
    options.method = RequestMethod.Patch;
    options.body = body;
    return this.crequest(url, options);
  }

  delete(url: string, options: RequestOptionsArgs = { }): Observable<Response> {
    options.method = RequestMethod.Delete;
    return this.crequest(url, options);
  }

  sendRefreshRequest(options?: RequestOptionsArgs): Observable<Response> {
    let self = this;
    options = this.prepareHeaders(options);
    return this.post(BASE_URL + "/refresh", {}, options);
  }

  private appendXsrf(options?: RequestOptionsArgs): RequestOptionsArgs {
    options.headers.append('X-XSRF-TOKEN', this.xsrf_token);
    return options;
  }

  private prepareHeaders(options? : RequestOptionsArgs): RequestOptionsArgs {
    options = options || {};
    options.headers = options.headers || new Headers();
    options.headers.append('Content-Type', 'application/json');
    options.withCredentials = true;
    return options;
  }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.getRequestForApi(request));
  }

  private getRequestForApi(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      url: `api${request.url}`
    });
  }
}

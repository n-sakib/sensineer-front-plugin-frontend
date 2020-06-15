import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { tap } from 'rxjs/operators';

import {MatSnackBar} from '@angular/material/snack-bar';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, public snackbar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${environment.token}`
      }
    });
    return next.handle(request).pipe(tap(
      (event: HttpEvent<any>) => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.snackbar.open("You are unauthorized to view this page", "", {
              duration: 2000,
            });
          }
        }
      }));
  }
}

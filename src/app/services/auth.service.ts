import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from './../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private api: ApiService) { }

  public getToken() {
    return environment.token;
  }

  public isAuthenticated() {
    return this.api.fetchTokenIdentity()
    .pipe(map(() => {
      return true
    }),
    catchError(() => {
      return of(false)
    }))
  }
}
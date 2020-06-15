import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable, EMPTY } from 'rxjs';
import { expand } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  public fetchTokenIdentity() {
    return this.http.get(`${environment.serverURL}/me`)
  }

  getConversations = (url): Observable<any> => {
    const getRange = (url?: string): Observable<any> => {
      return this.http.get(url);
     };

    return getRange(url).pipe(expand((res) => {
      if (res._pagination.next !== null) {
        return this.getConversations(res._pagination.next);
      } else {
        return EMPTY;
      }
    }));
  }
}

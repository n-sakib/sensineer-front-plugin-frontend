import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  public fetchTokenIdentity() {
    return this.http.get(`${environment.serverURL}/front/me`)
  }

  getCustomerEmails = (): Observable<any> => {
    return this.http.get(`${environment.serverURL}/front/customers?q[statuses][]=assigned&q[statuses][]=unassigned`)
  }

  getCustomerInfo= (identifier, isOrder): Observable<any> => {
    return this.http.get(`${environment.serverURL}/woocommerce/orders?identifier=${identifier}&isOrder=${isOrder}`) 
  }

  getPostId = (orderId): Observable<any> => {
    return this.http.get(`${environment.serverURL}/woocommerce/post?orderid=${orderId}`)
  }

  getConversations = (email): Observable<any> => {
    return this.http.get(`${environment.serverURL}/front/conversations?email=${email}`)
  }
}

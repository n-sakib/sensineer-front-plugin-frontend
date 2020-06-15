import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { environment } from './../../environments/environment'

@Component({
  selector: 'app-customer-order-info',
  templateUrl: './customer-order-info.component.html',
  styleUrls: ['./customer-order-info.component.css']
})

export class CustomerOrderInfoComponent implements OnInit {

  customers = [];

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    const temp = [];
    this.api.getConversations(`${environment.serverURL}/conversations?q[statuses][]=assigned&q[statuses][]=unassigned`).subscribe(
      customers => {
        // page received, push items to temp
        customers._results.forEach(customer => {
          temp.push(customer.recipient.handle);
        });
      },
      err => {
        // handle error
        console.log(err)
      },
      () => {
        // completed, expose temp to component
        this.customers = temp;
        this.customers = [...new Set(this.customers)];
        console.log(this.customers)
      })
    }
}




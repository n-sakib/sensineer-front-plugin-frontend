import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-customer-order-info',
  templateUrl: './customer-order-info.component.html',
  styleUrls: ['./customer-order-info.component.css']
})

export class CustomerOrderInfoComponent implements OnInit {

  customers = [];
  selectedCustomers = [];
  contentLoading = true;
  individualLoading = true;
  constructor(public api: ApiService) { }

  ngOnInit(): void {
    const temp = [];
    this.initCustomers()

  }

  initCustomers = () => {
    this.api.getCustomerEmails()
      .subscribe(
        res => {
          res.data.forEach(customer => {
            customer.loading = true
            this.customers.push(customer);
            this.selectedCustomers.push(customer);
          }),
            error => console.log(error)
        }).add(() => {
          this.contentLoading = false
          this.getOrders()
        });
  }

  getOrders = () => {
    this.customers.forEach((customer, idx) => {

      this.api.getCustomerInfo(customer.email)
        .subscribe(
          res => {
            this.customers[idx].info = res.data.customer
            this.customers[idx].name = `${res.data.customer.first_name} ${res.data.customer.last_name}`
            this.customers[idx].tlds = res.data.tlds
            this.customers[idx].phn = res.data.customer.phone
            this.customers[idx].postcode = res.data.customer.postcode
            this.customers[idx].company = res.data.customer.company
            this.customers[idx].lastname = res.data.customer.last_name
            this.customers[idx].orders = []

            res.data.orders.forEach(orders => {
              this.customers[idx].orders.push(orders)
            })
            this.customers[idx].loading = false
            this.selectedCustomers[idx] = this.customers[idx],
              error => console.log(error)
          }).add(() => {
            this.individualLoading = false
          });
    });
  }

  openPost = (id, tld) => {
    let postId
    this.individualLoading = true;
    this.api.getPostId(id).subscribe(res => {
        res.data === 0 ? postId = id: postId = res.data
        window.open(`https://www.smoovall.${tld}/wp-admin/post.php?post=${postId}&action=edit`, "_blank"),
        error => console.log(error)
    })
    this.individualLoading = false;
  }

  seeConversations = () => {
    console.log("here")
  }

  search = (event) => { //todo -> fix info
    var value = event.target.value.toLowerCase()
    this.selectedCustomers = this.customers.filter((customer) => customer.email?.toLowerCase().startsWith(value) 
    || customer.name?.toLowerCase().startsWith(value) || customer.lastname?.toLowerCase().startsWith(value)
    || customer.postcode?.toLowerCase().startsWith(value) || customer.phn?.toLowerCase().startsWith(value)
    || customer.orders?.some(o => o.id?.toString().toLowerCase().startsWith(value)))
  }
}
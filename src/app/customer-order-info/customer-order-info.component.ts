import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import Front from '@frontapp/plugin-sdk';

@Component({
  selector: 'app-customer-order-info',
  templateUrl: './customer-order-info.component.html',
  styleUrls: ['./customer-order-info.component.css']
})

export class CustomerOrderInfoComponent implements OnInit {

  customers: any = [];
  selectedCustomers: any = [];
  individualLoading = true;
  contentLoading = false;
  searchText = '';
  currentLoading = 0;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    Front.contextUpdates.subscribe(context => {
      this.contentLoading = false;
      this.customers = []
      switch (context.type) {
        case 'noConversation':
          console.log('No conversation selected');
          break;
        case 'singleConversation':
          this.individualLoading = true;
          this.customers.push({ email: (context as any).conversation.recipient.handle });
          this.getOrders();
          break;
        case 'multiConversations':
          this.individualLoading = true;
          (context as any).conversations.forEach(conversations => {
            this.customers.push({ email: conversations.recipient.handle });
            this.getOrders();
          });
          break;
        default:
          console.error(`Error: ${context.type}`);
          break;
      }
    });
  }

  getOrders = () => {
    this.currentLoading += 1;
    this.customers.forEach((customer, idx) => {
      this.api.getCustomerInfo(customer.email)
        .subscribe(
          res => {
            this.pushCustomerData(res, idx)
            error => console.log(error)
          }).add(() => {
            this.individualLoading = false
            this.currentLoading -= 1
          });
    });
  }

  pushCustomerData = (res, idx) => {
    this.customers[idx].info = res.data.customer
    this.customers[idx].name = `${res.data.customer.first_name} ${res.data.customer.last_name}`
    this.customers[idx].email = res.data.customer.email
    this.customers[idx].tlds = res.data.tlds
    this.customers[idx].phn = res.data.customer.phone
    this.customers[idx].postcode = res.data.customer.postcode
    this.customers[idx].address_1 = res.data.customer.address_1
    this.customers[idx].address_2 = res.data.customer.address_2
    this.customers[idx].city = res.data.customer.city
    this.customers[idx].country = res.data.customer.country
    this.customers[idx].company = res.data.customer.company
    this.customers[idx].lastname = res.data.customer.last_name
    this.customers[idx].orders = []

    res.data.orders.forEach(orders => {
      this.customers[idx].orders.push(orders)
    })
    this.customers[idx].loading = false
    this.selectedCustomers[idx] = this.customers[idx]
  }

  openPost = (id, tld) => {
    let postId
    this.individualLoading = true;
    this.api.getPostId(id).subscribe(res => {
      res.data === 0 ? postId = id : postId = res.id
      window.open(`https://www.smoovall.${tld}/wp-admin/post.php?post=${postId}&action=edit`, "_blank"),
        error => console.log(error)
    })
    this.individualLoading = false;
  }

  seeConversations = (email, conversation) => {
    this.router.navigateByUrl('/conversations', { state: { email, conversation } });
  }

  search = () => {
    this.contentLoading = true;
    if (this.searchText != '') {
      if (/^([0-9]{4,7})$/.test(this.searchText)) {
        this.api.getPostId(this.searchText).subscribe(res => {
          if(res.id !== 0) {
            this.api.getCustomerInfo(res.id)
            .subscribe(
              res => {
                this.customers[0] = {}
                this.pushCustomerData(res, 0)
                error => console.log(error)
              }).add(() => {
                this.individualLoading = false;
                this.contentLoading = false;
              });
          } else {
            this.getUpdatedInfo(this.searchText)
          }
        })
      } else {
        this.getUpdatedInfo(this.searchText)
      }
    }
  }

  getUpdatedInfo = (text) => {
    this.api.getCustomerInfo(text)
    .subscribe(
      res => {
        this.customers[0] = {}
        this.pushCustomerData(res, 0)
        error => console.log(error)
      }).add(() => {
        this.individualLoading = false;
        this.contentLoading = false;
      });
  }

  saveInput = (event) => {
    this.searchText = event.target.value.toLowerCase()
  }
}
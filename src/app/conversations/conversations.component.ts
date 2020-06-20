import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from '../services/api.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit {

  email;
  conversations = [];
  preLoadedConversation = []
  contentLoading = true;

  constructor(private location: Location,
    public api: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    var state: any = this.location.getState();
    this.email = state.email;
    this.preLoadedConversation = state.conversation;
    this.email ? this.getConversations(this.email): this.contentLoading = false;
  }

  getConversations = (email) => {
    this.api.getConversations(email)
      .subscribe(
        res => {
          if (!res.message.length) {
            this.conversations.push(this.preLoadedConversation)
            console.log(this.conversations)
          }
          res.message.forEach(customer => {
            this.conversations.push(customer);
          }),
            error => console.log(error)
        }).add(() => {
          this.contentLoading = false
        })
  }

  goBack = () => {
    this.location.back();
  }

  openConversation = (id) => {
    window.open(`https://app.frontapp.com/open/${id}`, "_blank")
  }
}

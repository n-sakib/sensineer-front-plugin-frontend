import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerOrderInfoComponent } from './customer-order-info/customer-order-info.component';
import { ConversationsComponent } from './conversations/conversations.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerOrderInfoComponent
  },
  {
    path: 'conversations',
    component: ConversationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

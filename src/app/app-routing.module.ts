import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerOrderInfoComponent } from './customer-order-info/customer-order-info.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { AuthGuardService } from './services/auth-guard.service'

const routes: Routes = [
  {
    path: '',
    component: CustomerOrderInfoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'conversations',
    component: ConversationsComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FPasswordComponent } from './f-password/f-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { LeadComponent } from './lead/lead.component';
import { SettingsComponent } from './settings/settings.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ClientComponent } from './client/client.component';
import { EstimateComponent } from './estimate/estimate.component';
import { LeadSettingsComponent } from './settings/lead-settings/lead-settings.component';
import { DealSettingsComponent } from './settings/deal-settings/deal-settings.component';
import { EstimateInvoiceSettingsComponent } from './settings/estimate-invoice-settings/estimate-invoice-settings.component';
import { BankSettingsComponent } from './settings/bank-settings/bank-settings.component';
import { CommonSettingsComponent } from './settings/estimate-invoice-settings/common-settings/common-settings.component';
import { EstimateSettingsComponent } from './settings/estimate-invoice-settings/estimate-settings/estimate-settings.component';
import { InvoiceSettingsComponent } from './settings/estimate-invoice-settings/invoice-settings/invoice-settings.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { ClientInfoComponent } from './client/client-info/client-info.component';
import { InvoiceInforComponent } from './invoice/invoice-infor/invoice-infor.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {path:'sidebar',component:SidebarComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'',component:RegisterComponent},
  {path:'register-page',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'forgot-password',component:FPasswordComponent},
  {path:'update-password',component:UpdatePasswordComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path: 'lead',component: LeadComponent},
  {path:'settings',component:SettingsComponent},
  {path:'invoice',component:InvoiceComponent},
  {path:'clients',component:ClientComponent},
  {path:'estimate',component:EstimateComponent},
  {path:'lead-settings',component:LeadSettingsComponent},
  {path:'deal-settings',component:DealSettingsComponent},
  {path:'estimate-invoice-settings',component:EstimateInvoiceSettingsComponent},
  {path:'bank-settings',component:BankSettingsComponent},
  {path:'common-settigs',component:CommonSettingsComponent},
  {path:'estimate-settings',component:EstimateSettingsComponent},
  {path:'invoice-settings',component:InvoiceSettingsComponent},
  {path:'add-client',component:AddClientComponent},
  {path:'client/:clientId', component: ClientInfoComponent },
  {path:'invoice/:id',component:InvoiceInforComponent}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

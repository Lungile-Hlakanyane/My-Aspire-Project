import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FPasswordComponent } from './f-password/f-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfrmDialogComponent } from './confrm-dialog/confrm-dialog.component';
import { LeadComponent } from './lead/lead.component';
import { AddLeadComponent } from './lead/add-lead/add-lead.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SettingsComponent } from './settings/settings.component';
import { InvoiceComponent } from './invoice/invoice.component';
import {MatTableModule} from '@angular/material/table';
import { ClientComponent } from './client/client.component';
import { EstimateComponent } from './estimate/estimate.component';
import { LeadSettingsComponent } from './settings/lead-settings/lead-settings.component';
import { DealSettingsComponent } from './settings/deal-settings/deal-settings.component';
import { EstimateInvoiceSettingsComponent } from './settings/estimate-invoice-settings/estimate-invoice-settings.component';
import { BankSettingsComponent } from './settings/bank-settings/bank-settings.component';
import { AddbankdeilsComponent } from './settings/bank-settings/addbankdeils/addbankdeils.component';
import { CommonSettingsComponent } from './settings/estimate-invoice-settings/common-settings/common-settings.component';
import { EstimateSettingsComponent } from './settings/estimate-invoice-settings/estimate-settings/estimate-settings.component';
import { InvoiceSettingsComponent } from './settings/estimate-invoice-settings/invoice-settings/invoice-settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddClientComponent } from './client/add-client/add-client.component'; // Import MatSnackBarModule
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';import { observeOn } from 'rxjs';
import { DeleteClientComponent } from './client/delete-client/delete-client.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ClientInfoComponent } from './client/client-info/client-info.component';
import { AddEstimateComponent } from './estimate/add-estimate/add-estimate.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { DeleteEstimateComponent } from './estimate/delete-estimate/delete-estimate.component';
import { EditComponentComponent } from './client/edit-component/edit-component.component';
import { DeleteLeadComponent } from './lead/delete-lead/delete-lead/delete-lead.component';
import { DeleteInvoiceComponent } from './invoice/delete-invoice/delete-invoice/delete-invoice.component';
import { EditInvoiceComponent } from './invoice/edit-invoice/edit-invoice/edit-invoice.component';
import { AddSenderComponent } from './invoice/sender/add-sender/add-sender.component';
import { AddInvoiceComponent } from './invoice/add-invoice/add-invoice/add-invoice.component';
import { InvoiceInforComponent } from './invoice/invoice-infor/invoice-infor.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AddStageComponent } from './lead/add-lead-stage/add-stage/add-stage.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DeleteLeadStageComponent } from './lead/delete-lead-stage/delete-lead-stage.component';
import { LeadInfoComponent } from './lead/lead-info/lead-info.component';
import { NgChartsModule } from 'ng2-charts';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubSideBarComponent } from './settings/sub-side-bar/sub-side-bar.component';
import { MessageclientComponent } from './messageclient/messageclient.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    FPasswordComponent,
    UpdatePasswordComponent,
    DashboardComponent,
    ConfrmDialogComponent,
    LeadComponent,
    AddLeadComponent,
    SearchBarComponent,
    SettingsComponent,
    ClientComponent,
    EstimateComponent,
    InvoiceComponent,
    LeadSettingsComponent,
    DealSettingsComponent,
    EstimateInvoiceSettingsComponent,
    BankSettingsComponent,
    AddbankdeilsComponent,
    CommonSettingsComponent,
    EstimateSettingsComponent,
    InvoiceSettingsComponent,
    AddClientComponent,
    DeleteClientComponent,
    ClientInfoComponent,
    AddEstimateComponent,
    DeleteEstimateComponent,
    EditComponentComponent,
    DeleteLeadComponent,
    DeleteInvoiceComponent,
    EditInvoiceComponent,
    AddSenderComponent,
    AddInvoiceComponent,
    InvoiceInforComponent,
    AddStageComponent,
    DeleteLeadStageComponent,
    LeadInfoComponent,
    SidebarComponent,
    SubSideBarComponent,
    MessageclientComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,  
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatPaginatorModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    DragDropModule,//included
    NgChartsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

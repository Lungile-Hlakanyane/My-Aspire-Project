import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfrmDialogComponent } from './confrm-dialog/confrm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SettingsComponent } from './settings/settings.component';
import { MatTableModule } from '@angular/material/table';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { DeleteEstimateComponent } from './estimate/delete-estimate/delete-estimate.component';
import { DeleteInvoiceComponent } from './invoice/delete-invoice/delete-invoice/delete-invoice.component';
import { EditInvoiceComponent } from './invoice/edit-invoice/edit-invoice/edit-invoice.component';

@NgModule({
  declarations: [
    UpdatePasswordComponent,
    ConfrmDialogComponent,
    SearchBarComponent,
    SettingsComponent,
    EstimateComponent,
    LeadSettingsComponent,
    DealSettingsComponent,
    EstimateInvoiceSettingsComponent,
    BankSettingsComponent,
    AddbankdeilsComponent,
    CommonSettingsComponent,
    EstimateSettingsComponent,
    InvoiceSettingsComponent,
    DeleteEstimateComponent,
    DeleteInvoiceComponent,
    EditInvoiceComponent,
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
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule {
}

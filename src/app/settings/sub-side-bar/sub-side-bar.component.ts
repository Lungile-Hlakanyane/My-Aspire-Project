import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sub-side-bar',
  templateUrl: './sub-side-bar.component.html',
  styleUrls: ['./sub-side-bar.component.scss']
})
export class SubSideBarComponent {

  @Output() toggleEstimateInvoiceEvent = new EventEmitter<void>();

  showEstimateInvoiceOptions:boolean = false;

  toggleEstimateInvoice() {
    this.showEstimateInvoiceOptions = !this.showEstimateInvoiceOptions;
    this.toggleEstimateInvoiceEvent.emit();
  }
}

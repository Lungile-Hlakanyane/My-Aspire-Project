import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateInvoiceSettingsComponent } from './estimate-invoice-settings.component';

describe('EstimateInvoiceSettingsComponent', () => {
  let component: EstimateInvoiceSettingsComponent;
  let fixture: ComponentFixture<EstimateInvoiceSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstimateInvoiceSettingsComponent]
    });
    fixture = TestBed.createComponent(EstimateInvoiceSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

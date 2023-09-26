import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceInforComponent } from './invoice-infor.component';

describe('InvoiceInforComponent', () => {
  let component: InvoiceInforComponent;
  let fixture: ComponentFixture<InvoiceInforComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceInforComponent]
    });
    fixture = TestBed.createComponent(InvoiceInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

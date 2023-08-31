import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FPasswordComponent } from './f-password.component';

describe('FPasswordComponent', () => {
  let component: FPasswordComponent;
  let fixture: ComponentFixture<FPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FPasswordComponent]
    });
    fixture = TestBed.createComponent(FPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

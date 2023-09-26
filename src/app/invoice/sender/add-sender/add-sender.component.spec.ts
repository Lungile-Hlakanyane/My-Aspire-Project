import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSenderComponent } from './add-sender.component';

describe('AddSenderComponent', () => {
  let component: AddSenderComponent;
  let fixture: ComponentFixture<AddSenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSenderComponent]
    });
    fixture = TestBed.createComponent(AddSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

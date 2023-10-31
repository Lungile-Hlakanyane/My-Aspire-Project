import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageclientComponent } from './messageclient.component';

describe('MessageclientComponent', () => {
  let component: MessageclientComponent;
  let fixture: ComponentFixture<MessageclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageclientComponent]
    });
    fixture = TestBed.createComponent(MessageclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

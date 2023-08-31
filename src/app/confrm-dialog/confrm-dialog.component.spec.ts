import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrmDialogComponent } from './confrm-dialog.component';

describe('ConfrmDialogComponent', () => {
  let component: ConfrmDialogComponent;
  let fixture: ComponentFixture<ConfrmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfrmDialogComponent]
    });
    fixture = TestBed.createComponent(ConfrmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

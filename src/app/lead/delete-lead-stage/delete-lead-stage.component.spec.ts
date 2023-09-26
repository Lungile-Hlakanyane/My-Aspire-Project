import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLeadStageComponent } from './delete-lead-stage.component';

describe('DeleteLeadStageComponent', () => {
  let component: DeleteLeadStageComponent;
  let fixture: ComponentFixture<DeleteLeadStageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteLeadStageComponent]
    });
    fixture = TestBed.createComponent(DeleteLeadStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEstimateComponent } from './delete-estimate.component';

describe('DeleteEstimateComponent', () => {
  let component: DeleteEstimateComponent;
  let fixture: ComponentFixture<DeleteEstimateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteEstimateComponent]
    });
    fixture = TestBed.createComponent(DeleteEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

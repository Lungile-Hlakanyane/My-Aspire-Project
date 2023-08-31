import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbankdeilsComponent } from './addbankdeils.component';

describe('AddbankdeilsComponent', () => {
  let component: AddbankdeilsComponent;
  let fixture: ComponentFixture<AddbankdeilsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddbankdeilsComponent]
    });
    fixture = TestBed.createComponent(AddbankdeilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

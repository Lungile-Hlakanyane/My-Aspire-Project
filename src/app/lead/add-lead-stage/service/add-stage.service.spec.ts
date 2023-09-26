import { TestBed } from '@angular/core/testing';

import { AddStageService } from './add-stage.service';

describe('AddStageService', () => {
  let service: AddStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

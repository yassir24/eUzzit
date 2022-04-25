import { TestBed } from '@angular/core/testing';

import { CheckpinService } from './checkpin.service';

describe('CheckpinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckpinService = TestBed.get(CheckpinService);
    expect(service).toBeTruthy();
  });
});

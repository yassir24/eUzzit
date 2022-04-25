import { TestBed, async, inject } from '@angular/core/testing';

import { CompleteProfileGuard } from './complete-profile.guard';

describe('CompleteProfileGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompleteProfileGuard]
    });
  });

  it('should ...', inject([CompleteProfileGuard], (guard: CompleteProfileGuard) => {
    expect(guard).toBeTruthy();
  }));
});

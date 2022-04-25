import { TestBed, async, inject } from '@angular/core/testing';

import { ValidatedGuard } from './validated.guard';

describe('ValidatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidatedGuard]
    });
  });

  it('should ...', inject([ValidatedGuard], (guard: ValidatedGuard) => {
    expect(guard).toBeTruthy();
  }));
});

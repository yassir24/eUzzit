import { TestBed, async, inject } from '@angular/core/testing';

import { PinGuard } from './pin.guard';

describe('PinGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PinGuard]
    });
  });

  it('should ...', inject([PinGuard], (guard: PinGuard) => {
    expect(guard).toBeTruthy();
  }));
});

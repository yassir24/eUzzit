import { TestBed } from '@angular/core/testing';

import { InterswitchService } from './interswitch.service';

describe('InterswitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterswitchService = TestBed.get(InterswitchService);
    expect(service).toBeTruthy();
  });
});

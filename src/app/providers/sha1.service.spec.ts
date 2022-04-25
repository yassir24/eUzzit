import { TestBed } from '@angular/core/testing';

import { Sha1Service } from './sha1.service';

describe('Sha1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Sha1Service = TestBed.get(Sha1Service);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MerchantManagementService } from './merchant-management.service';

describe('MerchantManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MerchantManagementService = TestBed.get(MerchantManagementService);
    expect(service).toBeTruthy();
  });
});

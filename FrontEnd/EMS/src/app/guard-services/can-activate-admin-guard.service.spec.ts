import { TestBed, inject } from '@angular/core/testing';

import { CanActivateAdminGuardService } from './can-activate-admin-guard.service';

describe('CanActivateGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateAdminGuardService]
    });
  });

  it('should be created', inject([CanActivateAdminGuardService], (service: CanActivateAdminGuardService) => {
    expect(service).toBeTruthy();
  }));
});

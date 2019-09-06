import { TestBed, inject } from '@angular/core/testing';

import { CanActivateNormalGuardService } from './can-activate-normal-guard.service';

describe('CanActivateNormalGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateNormalGuardService]
    });
  });

  it('should be created', inject([CanActivateNormalGuardService], (service: CanActivateNormalGuardService) => {
    expect(service).toBeTruthy();
  }));
});

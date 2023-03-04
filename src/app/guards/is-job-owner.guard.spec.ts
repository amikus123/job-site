import { TestBed } from '@angular/core/testing';

import { IsJobOwnerGuard } from './is-job-owner.guard';

describe('IsJobOwnerGuard', () => {
  let guard: IsJobOwnerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsJobOwnerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HostnameService } from './hostname.service';

describe('HostnameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HostnameService = TestBed.get(HostnameService);
    expect(service).toBeTruthy();
  });
});

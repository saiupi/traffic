import { TestBed } from '@angular/core/testing';

import { LoaderproviderService } from './loaderprovider.service';

describe('LoaderproviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaderproviderService = TestBed.get(LoaderproviderService);
    expect(service).toBeTruthy();
  });
});

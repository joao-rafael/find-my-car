import { TestBed } from '@angular/core/testing';

import { POITrackingService } from './poitracking.service';

describe('POITrackingService', () => {
  let service: POITrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(POITrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

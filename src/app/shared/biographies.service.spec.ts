import { TestBed, inject } from '@angular/core/testing';

import { BiographiesService } from './biographies.service';

describe('BiographiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BiographiesService]
    });
  });

  it('should ...', inject([BiographiesService], (service: BiographiesService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { WebControllerService } from './web-controller.service';

describe('WebControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebControllerService]
    });
  });

  it('should be created', inject([WebControllerService], (service: WebControllerService) => {
    expect(service).toBeTruthy();
  }));
});

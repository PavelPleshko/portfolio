import { TestBed, inject } from '@angular/core/testing';

import { DataLoadService } from './data-load.service';

describe('DataLoadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataLoadService]
    });
  });

  it('should be created', inject([DataLoadService], (service: DataLoadService) => {
    expect(service).toBeTruthy();
  }));
});

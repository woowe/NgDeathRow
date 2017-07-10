import { TestBed, inject } from '@angular/core/testing';

import { DeathRowDatasetService } from './death-row-dataset.service';

describe('DeathRowDatasetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeathRowDatasetService]
    });
  });

  it('should be created', inject([DeathRowDatasetService], (service: DeathRowDatasetService) => {
    expect(service).toBeTruthy();
  }));
});

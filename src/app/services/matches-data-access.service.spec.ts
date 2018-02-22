import { TestBed, inject } from '@angular/core/testing';

import { MatchesDataAccessService } from './matches-data-access.service';

describe('MatchesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchesDataAccessService]
    });
  });

  it('should be created', inject([MatchesDataAccessService], (service: MatchesDataAccessService) => {
    expect(service).toBeTruthy();
  }));
});

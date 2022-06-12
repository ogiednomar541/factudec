import { TestBed } from '@angular/core/testing';

import { ProcessFilesService } from './process-files.service';

describe('ProcessFilesService', () => {
  let service: ProcessFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

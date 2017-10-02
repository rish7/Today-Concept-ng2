/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PagedataService } from './pagedata.service';

describe('PagedataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagedataService]
    });
  });

  it('should ...', inject([PagedataService], (service: PagedataService) => {
    expect(service).toBeTruthy();
  }));
});

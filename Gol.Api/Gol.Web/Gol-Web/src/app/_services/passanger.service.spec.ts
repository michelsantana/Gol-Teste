/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PassangerService } from './passanger.service';

describe('Service: Passanger', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassangerService]
    });
  });

  it('should ...', inject([PassangerService], (service: PassangerService) => {
    expect(service).toBeTruthy();
  }));
});

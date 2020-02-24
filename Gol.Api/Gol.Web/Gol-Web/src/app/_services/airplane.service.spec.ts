/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AirplaneService } from './airplane.service';

describe('Service: Airplane', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AirplaneService]
    });
  });

  it('should ...', inject([AirplaneService], (service: AirplaneService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VeterinaryApiService } from './veterinary-api.service';

describe('Service: VeterinaryApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VeterinaryApiService]
    });
  });

  it('should ...', inject([VeterinaryApiService], (service: VeterinaryApiService) => {
    expect(service).toBeTruthy();
  }));
});

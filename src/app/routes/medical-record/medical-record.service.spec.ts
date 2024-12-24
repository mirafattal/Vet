/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MedicalRecordService } from './medical-record.service';

describe('Service: MedicalRecord', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicalRecordService]
    });
  });

  it('should ...', inject([MedicalRecordService], (service: MedicalRecordService) => {
    expect(service).toBeTruthy();
  }));
});

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicalRecord } from './medical-record.component'; // Import your interface

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  private apiUrl = 'https://localhost:7175/api/MedicalRecord/GetAll'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Method to fetch all medical records
  getMedicalRecord(): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>(this.apiUrl);
  }
}

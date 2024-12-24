import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import {
  FormControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { APIClient, GetStaffNamesdto, MedicalRecordDto, StaffWithRoleDTO } from '@shared/services/api-client/veterinary-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-adding-medical',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
  imports: [
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDatepickerModule
  ],
  templateUrl: './adding-medical.component.html',
  styleUrl: './adding-medical.component.scss'
})
export class AddingMedicalComponent implements OnInit {

  staffWithRoles: StaffWithRoleDTO[] = [];
  doctorNames: StaffWithRoleDTO[] = [];

  medical: MedicalRecordDto = new MedicalRecordDto();
  animalId: number; // Store the passed animalId
  private _formBuilder = inject(FormBuilder);
    constructor(private apiService: APIClient,
       public dialogRef: MatDialogRef<AddingMedicalComponent>,
       @Inject(MAT_DIALOG_DATA) public data: { animalId: number})  // Inject the passed data)
       {
        this.animalId = data.animalId; // Access the passed animalId
       }

    readonly range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });


    StaffName: GetStaffNamesdto[] = []; // Initialize as an empty array by default
    doctorControl = new FormControl();


    ngOnInit(): void {
      this.apiService.getStaffNames().subscribe((data: GetStaffNamesdto[]) => {
      this.StaffName = data; // Store the doctor names as an array
      },)
      this.apiService.staffwithroles().subscribe((staff) => {
        this.staffWithRoles = staff;
        this.doctorNames = staff.filter((s) => s.roleName === 'Pet Doctor'); // Filter by RoleName
      });

    };


    onSubmit() {
      this.medical;

      this.medical.createdAt = new Date("2024-12-12");
      this.medical.medicalRecordId = 0;
      this.medical.animalId = this.animalId;
      console.log('Submitting the following data:',this.medical);
      // Send the DTO to the backend
      this.apiService.add6(this.medical).subscribe({
        next: (response) => {
          console.log('Response from backend:', response);
          alert('Medical Record added successfully!');
          this.dialogRef.close(response); // Close the dialog on successful submission
        },
        error: (err) => {
          console.error('Error adding Medical Records:', err);
          alert('Failed to add medical record!');
        },
      });
    }
    onCancel(): void {
      this.dialogRef.close(); // Close the dialog
    }
}

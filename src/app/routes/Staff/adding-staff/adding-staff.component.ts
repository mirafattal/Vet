import { Component, inject, OnInit } from '@angular/core';
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
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { APIClient, StaffRoleDto, StaffRoleDtoIEnumerableApiResponse, StaffWithRoleDTO } from '@shared/services/api-client/veterinary-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-adding-staff',
  standalone: true,
  imports: [
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDatepickerModule
  ],
  templateUrl: './adding-staff.component.html',
  styleUrl: './adding-staff.component.scss'
})
export class AddingStaffComponent implements OnInit{

  staffwithRole: StaffWithRoleDTO = new StaffWithRoleDTO();


    private _formBuilder = inject(FormBuilder);


    constructor(private apiService: APIClient, public dialogRef: MatDialogRef<AddingStaffComponent>) {}

    readonly range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });

    staffRole!: StaffRoleDto;
    staffRoles: StaffRoleDto[] = []; // Initialize as an empty array by default
    staffControl = new FormControl();

    ngOnInit(): void {
      // Get all animal types from the backend
      this.apiService.getAll14().subscribe((response: StaffRoleDtoIEnumerableApiResponse) => {
        this.staffRoles = response.data ?? [];
      });
    }

    onSubmit() {
      // Log current data to ensure everything is correct
      console.log('full name:', this.staffwithRole.fullName);
      console.log('Submitting the following data:', this.staffwithRole);
      console.log('staff role ID:', this.staffwithRole.staffRoleId);

      if (!this.staffwithRole.staffRoleId) {
        console.error('Staff role ID is missing!');
        alert('Please select a staff role.');
        return;
      }

      // Set animal object in animalowner
      this.staffwithRole.staffId = 0;


      // Call backend service to add the owner and animal
      this.apiService.add13(this.staffwithRole).subscribe({
        next: (response) => {
          console.log('Response from backend:', response);
            alert('staff added successfully!');
            this.dialogRef.close(); // Close the dialog on successful submission
        },
        error: (err) => {
          console.error('Error adding staff member:', err);
          alert('Failed to add staff member!');
        },
      });
    }

    onCancel(): void {
      this.dialogRef.close(); // Close the dialog
    }

}

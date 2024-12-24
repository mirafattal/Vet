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
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { AddOwnerAndAnimalDto, AnimalDto, AnimalTypeDto, AnimalTypeDtoIEnumerableApiResponse, APIClient } from '@shared/services/api-client/veterinary-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-adding-pet',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
  imports: [
    MatDialogModule,
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
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './adding-pet.component.html',
  styleUrl: './adding-pet.component.scss'
})
export class AddingPetComponent implements OnInit {
  animal: AnimalDto = new AnimalDto();
  animalowner: AddOwnerAndAnimalDto = new AddOwnerAndAnimalDto();

  private _formBuilder = inject(FormBuilder);


  constructor(private apiService: APIClient, public dialogRef: MatDialogRef<AddingPetComponent>) {}

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  animaltype: AnimalTypeDto[] = []; // Initialize as an empty array by default
  animalControl = new FormControl();

  ngOnInit(): void {
    // Get all animal types from the backend
    this.apiService.getAll2().subscribe((response: AnimalTypeDtoIEnumerableApiResponse) => {
      this.animaltype = response.data ?? [];
    });
  }

  onSubmit() {
    // Log current data to ensure everything is correct
    console.log('Animal Birth Date:', this.animal.animalBirthDate);
    console.log('Submitting the following data:', this.animalowner);
    console.log('Animal Type ID:', this.animal.animalTypeId);

    // Set animal object in animalowner
    this.animalowner.animals = this.animal;
    this.animalowner.ownerId = 0;
    this.animalowner.animals.animalId = 0;
    this.animalowner.animals.ownerId = this.animalowner.ownerId


    // Call backend service to add the owner and animal
    this.apiService.addownerwithanimal(this.animalowner).subscribe({
      next: (response) => {
        console.log('Response from backend:', response);
          alert('Owner and Animal added successfully!');
          this.dialogRef.close(); // Close the dialog on successful submission
      },
      error: (err) => {
        console.error('Error adding owner and animals:', err);
        alert('Failed to add owner and animals!');
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog
  }
}

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
import { AddOwnerAndAnimalDto, AnimalDto, AnimalTypeDto, AnimalTypeDtoIEnumerableApiResponse, APIClient, OwnerDto, OwnerDtoIEnumerableApiResponse } from '@shared/services/api-client/veterinary-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-add-horse',
  standalone: true,
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
  templateUrl: './add-horse.component.html',
  styleUrls: ['./add-horse.component.scss']
})
export class AddHorseComponent implements OnInit {
  animal: AnimalDto = new AnimalDto();
  animalowner: AddOwnerAndAnimalDto = new AddOwnerAndAnimalDto();

  owners: OwnerDto[] = [];
  selectedOwnerName: string | null | undefined = null; // Display name for the selected owner
  selectedOwnerId: number | undefined; // Currently selected owner's ID
  formDisabled: boolean = false;  // To disable other form fields if owner is selected

  loadOwnerNames(): void {
    this.apiService.getAllOwnerNames().subscribe(
      (data) => {
        this.owners = data;  // Store owners in the owners
      },
      (error) => {
        console.error('Error fetching owner names:', error);
      }
    );
  }

  private _formBuilder = inject(FormBuilder);


  constructor(private apiService: APIClient, public dialogRef: MatDialogRef<AddHorseComponent>) {}

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  animaltype: AnimalTypeDto[] = []; // Initialize as an empty array by default
  animalControl = new FormControl();

  ngOnInit(): void {
    // Get all animal types from the backend
    this.apiService.getAll4().subscribe((response: AnimalTypeDtoIEnumerableApiResponse) => {
      this.animaltype = response.data ?? [];
    });
    this.loadOwnerNames();
  }

// Method to handle when an owner is selected
onOwnerSelected() {
  // Check if an owner is selected
  this.formDisabled = this.selectedOwnerId !== null;
}

AddanimalOnly: AnimalDto = new AnimalDto();

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

    //console.log('Selected Owner:', this.selectedOwnerId);
    // if (this.selectedOwnerId) {
    //   this.AddanimalOnly.ownerId = this.selectedOwnerId; // Use the selected owner ID
    //   this.apiService.add(this.AddanimalOnly).subscribe({
    //     next: (response) => {
    //       console.log('Response from backend:', response);
    //       alert('Animal added successfully to existing Owner!');
    //       this.dialogRef.close(); // Close the dialog on successful submission
    //     }
    //   })
    // } else {
    //   console.error('No owner selected!');
    //   alert('Please select an owner before submitting.');
    //   return; // Exit if no owner is selected
    // }

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
    this.selectedOwnerId = 0;
    this.selectedOwnerName = '';
    this.formDisabled = false;
  }
}


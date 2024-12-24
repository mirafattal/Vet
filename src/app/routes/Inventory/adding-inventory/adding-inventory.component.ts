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
import { APIClient, InventoryDto } from '@shared/services/api-client/veterinary-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-adding-inventory',
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
  templateUrl: './adding-inventory.component.html',
  styleUrl: './adding-inventory.component.scss'
})
export class AddingInventoryComponent {
inventory: InventoryDto = new InventoryDto();


private _formBuilder = inject(FormBuilder);


constructor(private apiService: APIClient, public dialogRef: MatDialogRef<AddingInventoryComponent>) {}

  readonly range = new FormGroup({
  start: new FormControl<Date | null>(null),
  end: new FormControl<Date | null>(null),
  });

  ngOnInit(): void { }

  onSubmit() {
      // Log current data to ensure everything is correct
      console.log('full name:', this.inventory.itemId);
      console.log('Submitting the following data:', this.inventory);

      // Set animal object in animalowner
      this.inventory.itemId = 0;


      // Call backend service to add the owner and animal
      this.apiService.add4(this.inventory).subscribe({
        next: (response) => {
          console.log('Response from backend:', response);
            alert('Item added successfully!');
            this.dialogRef.close(); // Close the dialog on successful submission
        },
        error: (err) => {
          console.error('Error adding staff member:', err);
          alert('Failed to add Item!');
        },
      });
    }

    onCancel(): void {
      this.dialogRef.close(); // Close the dialog
    }

}

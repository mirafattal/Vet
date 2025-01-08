import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { APIClient, InventoryDto, StaffWithRoleDTO } from '@shared/services/api-client/veterinary-api.service';
import { CommonModule } from '@angular/common';
import { AddingInventoryComponent } from './adding-inventory/adding-inventory.component';
import { AddDollarPipe } from '@shared/pipes/add-dollar.pipe';


@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    AddDollarPipe
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {

  inventory: InventoryDto[] = [];
  displayedColumns = ['ItemName', 'Quantity', 'UnitPrice', 'LastRestocked', 'actions'];
  dataSource = new MatTableDataSource<any>([]); // Initialize with an empty array
  itemId: number | null = null;

    constructor(private apiService: APIClient, private router: Router,
        private route: ActivatedRoute,) {}

      ngOnInit(): void {
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const filterValue = filter.trim().toLowerCase();
          return (
             data.itemName.toLowerCase().includes(filterValue)
           );
        }
          this.fetchData();
       }

        fetchData(){
        this.apiService.getAll8().subscribe(
          (response) => {
          this.inventory = response.data ?? []; // Directly replace with the API response
          this.dataSource.data = this.inventory;
          console.log('Inventory Details:', this.inventory);
                },
        (error) => {
        console.error('Error fetching inventory details', error);
         }
       );
    }



        applyFilter(event: Event): void {
          const filterValue = (event.target as HTMLInputElement).value;
          this.dataSource.filter = filterValue.trim().toLowerCase();
        }

        onEdit(row: any): void {
          console.log('Edit action clicked for:', row);
          // Add logic to edit details
        }

        onDelete(row: any): void {
          console.log('Item ID to delete:', row.itemId); // Log the ownerId
          console.log('Delete action clicked for:', row);

          // Confirm the deletion action (optional)
          const confirmDelete = window.confirm(`Are you sure you want to delete ${row.itemName}?`);
          if (!confirmDelete) {
            return; // If user cancels, do nothing
          }

          // Call the backend service to delete the owner and animal
          this.apiService.deleteById8(row.itemId).subscribe({
            next: (response) => {
              console.log('Delete successful:', response);
              // Update the UI (remove the row from the table, etc.)
              this.removeRowFromTable(row);
              alert('Item has been deleted successfully!');
            },
            error: (err) => {
              console.error('Error deleting item:', err);
              alert('Failed to delete the Item!');
            }
          });
        }

        removeRowFromTable(row: any): void {
          // Implement logic to remove the deleted row from your displayed data
          const index = this.inventory.findIndex(item => item.itemId === row.itemId);
          if (index !== -1) {
            this.inventory.splice(index, 1);  // Remove the row from your data array
          }
        }

        readonly dialog = inject(MatDialog);
        openDialog() {
          this.dialog.open(AddingInventoryComponent, {
            disableClose: true, // Prevents closing on outside click or Escape key
          });
        }


}



import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
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
import { AddingPetComponent } from './adding-pet/adding-pet.component';
import { AnimalDto, APIClient, OwnerDto } from '@shared/services/api-client/veterinary-api.service';
import { DrawerPosition, MtxDrawer, MtxDrawerRef } from '@ng-matero/extensions/drawer';
import { PetDetailComponent } from './pet-detail/pet-detail.component';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.scss'
})

export class PetComponent implements OnInit {

    animals: AnimalDto[] = [];
    owners: OwnerDto[] = [];
    displayedColumns = ['OwnerName', 'AnimalName', 'Species', 'Breed', 'actions'];
    dataSource = new MatTableDataSource<any>([]); // Initialize with an empty array
    animalId: number | null = null;

    position: DrawerPosition = 'right';
    width = '900px';
    height = '300px';
    hasBackdrop = true;
    disableClose = false;
    closeOnNavigation = true;

    constructor(private apiService: APIClient, private router: Router,
      private route: ActivatedRoute, private drawer: MtxDrawer) {}

      open(animalId: number) {
        console.log('Opening drawer for Animal ID:', animalId);
        const drawerRef = this.drawer.open(PetDetailComponent, {
          position: this.position,
          width: this.width,
          height: this.height,
          hasBackdrop: this.hasBackdrop,
          disableClose: this.disableClose,
          closeOnNavigation: this.closeOnNavigation,
          data: {animalId},
        });

        drawerRef.afterDismissed().subscribe(result => {
          console.log('The drawer was dismissed');
        });
      }

    ngOnInit(): void {
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const filterValue = filter.trim().toLowerCase();
        return (
          data.animalName.toLowerCase().includes(filterValue) ||
          data.fullName.toLowerCase().includes(filterValue)
        );
      };

      this.route.paramMap.subscribe((params) => {
        const idParam = params.get('id');
        console.log('Route param (id):', idParam);
        this.animalId = idParam ? +idParam : 0;
        console.log('Animal ID:', this.animalId);

        // Fetch data after the animalId is set
        this.fetchData();
      });
    }

      fetchData(): void {
        forkJoin({
          animals: this.apiService.getAll(),
          owners: this.apiService.getAll7(),
        }).subscribe(
          ({ animals, owners }: any) => {
            console.log('Animals Response:', animals);
            console.log('Owners Response:', owners);

            const animalList = animals.data; // Extract animals array
            const ownerList = owners.data; // Extract owners array

            if (animalList && ownerList) {
              this.dataSource.data = animalList.map((animal: any) => {
                const owner = ownerList.find((o: any) => o.ownerId === animal.ownerId);
                return {
                  animalId: animal.animalId,
                  animalName: animal.animalName,
                  species: animal.species,
                  breed: animal.breed,
                  fullName: owner ? owner.fullName : 'Unknown',
                  ownerId: owner ? owner.ownerId : null,  // Ensure ownerId is included
                };
              });

              console.log('Combined Data:', this.dataSource.data);
            }
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      }

    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // onView(animalId: number): void {
    //   console.log('Animal ID to view:', animalId);
    //   console.log('Navigating to animal with ID:', animalId);
    //   this.router.navigate(['/pet-detail', animalId]);
    // }

    onEdit(row: any): void {
      console.log('Edit action clicked for:', row);
      // Add logic to edit details
    }

    onDelete(row: any): void {
      console.log('Owner ID to delete:', row.ownerId); // Log the ownerId
      console.log('Delete action clicked for:', row);

      // Confirm the deletion action (optional)
      const confirmDelete = window.confirm(`Are you sure you want to delete ${row.fullName} and its associated animals?`);
      if (!confirmDelete) {
        return; // If user cancels, do nothing
      }

      // Call the backend service to delete the owner and animal
      this.apiService.deleteownerwithanimal(row.ownerId).subscribe({
        next: (response) => {
          console.log('Delete successful:', response);
          // Update the UI (remove the row from the table, etc.)
          this.removeRowFromTable(row);
          alert('Owner and associated animal deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting owner and animal:', err);
          alert('Failed to delete owner and animal!');
        }
      });
    }

    removeRowFromTable(row: any): void {
      // Implement logic to remove the deleted row from your displayed data
      const index = this.owners.findIndex(item => item.ownerId === row.ownerId);
      if (index !== -1) {
        this.owners.splice(index, 1);  // Remove the row from your data array
      }
    }

    readonly dialog = inject(MatDialog);
    openDialog() {
      this.dialog.open(AddingPetComponent, {
        disableClose: true, // Prevents closing on outside click or Escape key
      });
    }

}


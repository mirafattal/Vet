import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { forkJoin } from 'rxjs';
import { AnimalDto, APIClient, OwnerDto } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.scss'],
  standalone: true,
 imports: [
  MatIconModule, MatTableModule,
  MatButtonModule, RouterModule,
  MatCardModule,
  MatFormFieldModule, MatInputModule
 ],
})
export class MedicalRecordComponent implements OnInit {
  animals: AnimalDto[] = [];
  owners: OwnerDto[] = [];
  displayedColumns = ['AnimalName', 'OwnerName', 'Species', 'actions'];
  dataSource = new MatTableDataSource<any>([]); // Initialize with an empty array

  constructor(private apiService: APIClient, private router: Router) {}

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const filterValue = filter.trim().toLowerCase();
      return (
        data.animalName.toLowerCase().includes(filterValue) ||
        data.fullName.toLowerCase().includes(filterValue)
      );
    };
    this.fetchData();
  }

    fetchData(): void {
      forkJoin({
        animals: this.apiService.getAll(),
        owners: this.apiService.getAll8(),
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
                animalName: animal.animalName,
                species: animal.species,
                fullName: owner ? owner.fullName : 'Unknown',
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
  fetchAnimals(): void {
    this.apiService.getAll().subscribe(
      (response) => {
        // Assuming the array of animals is in a 'data' property
        if (response && response.data) {
          this.animals = response.data; // Update animals array
          this.dataSource.data = this.animals; // Update dataSource
          console.log(this.animals); // Log the animals array
        } else {
          console.error('No animals data found in the response.');
        }
      },
      (error) => {
        console.error('Error fetching animals', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onView(): void {
    console.log('View action clicked for:');
    this.router.navigate(['pet-detail']);
  }

  onEdit(row: any): void {
    console.log('Edit action clicked for:', row);
    // Add logic to edit details
  }

  onDelete(row: any): void {
    console.log('Delete action clicked for:', row);
    // Add logic to delete the row
  }
}

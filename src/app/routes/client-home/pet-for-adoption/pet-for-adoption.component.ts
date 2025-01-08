import { Component, OnInit } from '@angular/core';
import { ClientToolbarComponent } from '../client-toolbar/client-toolbar.component';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { APIClient, PetForAdoptionDto, PetForAdoptionDtoIEnumerableApiResponse } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-pet-for-adoption',
  standalone: true,
  imports: [
    ClientToolbarComponent,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './pet-for-adoption.component.html',
  styleUrls: ['./pet-for-adoption.component.scss']
})
export class PetForAdoptionComponent implements OnInit {

  pets: PetForAdoptionDto[] = [];

  constructor(private router: Router, private apiService: APIClient) {}

  loadPets(): void {
    this.apiService.getAll12().subscribe(
      (response: PetForAdoptionDtoIEnumerableApiResponse) => {
        if (response && response.data) {
          this.pets = response.data; // Assuming `data` is the array of PetForAdoptionDto
        } else {
          console.error('API response does not contain the expected data');
          this.pets = []; // Set to an empty array in case of invalid response
        }
      },
      (error) => {
        console.error('Error fetching pets for adoption:', error);
        this.pets = []; // Handle the error by setting to an empty array
      }
    );
  }

  adoptPet(petForAdoptionId: number | undefined): void {
    if (!petForAdoptionId) {
      console.error('PetForAdoptionId is undefined!');
      return;
    }

    this.router.navigate(['/adoption-questionnaire'], { queryParams: { petForAdoptionId } });
  }

  ngOnInit() {
    this.loadPets();
  }

  navigateTo(link: string): void {
    this.router.navigate([link]);
  }

}

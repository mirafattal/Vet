import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdoptionQuestionnaireDto, APIClient } from '@shared/services/api-client/veterinary-api.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ClientToolbarComponent } from "../client-toolbar/client-toolbar.component";

@Component({
  selector: 'app-adoption-questionnaire',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    ClientToolbarComponent
],
  templateUrl: './adoption-questionnaire.component.html',
  styleUrls: ['./adoption-questionnaire.component.scss']
})
export class AdoptionQuestionnaireComponent implements OnInit {

  petForAdoptionId!: number;

  adoption: AdoptionQuestionnaireDto = new AdoptionQuestionnaireDto();

  constructor(private apiService: APIClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.petForAdoptionId = +params['petForAdoptionId']; // Retrieve and store the ID
      // You can now use this.petForAdoptionId to fetch specific pet details from the backend
    });
  }

  onSubmit() {
    // Log current data to ensure everything is correct

    this.adoption.adoptionQuestionnaireId = 0;
    this.adoption.petForAdoptionId = 1;
    // Call backend service to add the questionnaire
    this.apiService.add(this.adoption).subscribe({
      next: (response) => {
        console.log('Response from backend:', response);
          alert('adoption questionnaire added successfully!');
      },
      error: (err) => {
        console.error('Error adding adoption questionnaire:', err);
        alert('Failed to add adoption questionnaire!');
      },
    });
  }

  navigateTo(link: string): void {
    this.router.navigate([link]);
  }
    onSurgeryDetails() {
      // Navigate to the add pet route
      this.router.navigate(['surgery-home']); }

    onAdoptNow() {
      // Navigate to the add pet route
      this.router.navigate(['adoption-questionnaire']); }

      setMarriedStatus(status: boolean) {
        this.adoption.isMarried = status;
      }
}

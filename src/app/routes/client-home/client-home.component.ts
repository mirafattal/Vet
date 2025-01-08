import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss'
})
export class ClientHomeComponent {
  @Input() backgroundImageUrl: string = 'images/MyImages/BackgroundImage1.webp';


  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  WelcomeText = `Welcome to Anderson Vet Clinic, your trusted animal hospital dedicated
  to caring for both small pets and large animals. We provide comprehensive medical, surgical,
  and dental care for your beloved pets and specialize in equine medicine, offering expert care for horses.
  Our experienced team ensures a welcoming,
  stress-free environment for every visit, so your animals feel safe and cared for.`;

  constructor(private router: Router) {}

  onSurgeryDetails() {
    // Navigate to the add pet route
    this.router.navigate(['surgery-home']); }

  onAdoptNow() {
    // Navigate to the add pet route
    this.router.navigate(['pet-for-adoption']); }

  onBookAppointment() {
    this.router.navigate(['book-appointment']);
  }

}

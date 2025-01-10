import { Component, OnInit } from '@angular/core';
import { ClientToolbarComponent } from '../client-toolbar/client-toolbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vaccine-details',
  standalone: true,
  imports: [
    ClientToolbarComponent,
    CommonModule
  ],
  templateUrl: './vaccine-details.component.html',
  styleUrls: ['./vaccine-details.component.scss']
})
export class VaccineDetailsComponent implements OnInit {

  navigateTo(link: string): void {
    this.router.navigate([link]);
  }

  constructor(private router: Router) { }

  onBookNow(){
    this.router.navigate(['book-appointment']);
  }

  vaccinationDetails = {
    title: 'Protect Your Pets with Comprehensive Vaccination Services at Dr. PawPaw Center',
    paragraphs: [
      'Vaccinations are a vital part of your pet’s health care, providing protection against a variety of serious and potentially life-threatening diseases. At Dr. PawPaw Center, we are dedicated to keeping your furry friends safe and healthy.',
      'Our vaccination services are tailored to your pet’s age, breed, lifestyle, and health status. We ensure that they receive the right vaccines at the right time to maintain their immunity.',
      'By staying on top of your pet’s vaccination schedule, you’re not only safeguarding their health but also contributing to the prevention of contagious diseases in the community.',
      'Trust our experienced team to provide compassionate care and expert advice on all your pet’s vaccination needs. Together, we can ensure a long and healthy life for your beloved companion.'
    ],
    subtitle1: 'The Importance of Vaccinations',
    additionalDetails1: [
      'Vaccinations protect your pet from diseases like rabies, distemper, parvovirus, and more. They are a critical component of preventive care, helping to keep your pet healthy and happy.',
      'Beyond protecting your own pet, vaccinations play a role in reducing the spread of diseases to other animals and humans. It’s a simple but effective way to protect your community.'
    ],
    subtitle2: 'Customized Vaccination Plans',
    additionalDetails2: [
      'Every pet is unique, and their vaccination needs may vary. Our team develops personalized vaccination plans to meet the specific needs of your pet, ensuring they are protected without unnecessary vaccinations.',
      'We keep detailed records of your pet’s vaccination history and send reminders for upcoming boosters, so you never miss an important shot.'
    ],
    subtitle3: 'Schedule Your Pet’s Vaccination Today!',
    closingParagraph: 'Regular vaccinations are one of the easiest ways to ensure your pet’s health and well-being. Don’t delay—schedule your pet’s vaccination appointment today and give them the best protection possible.',
    contact: 'For more information about our vaccination services, call us at 800-462-8749 or email vaccinations@drpawpawcenter.com.',
    bookAppointmentText: 'Book Appointment',
  };


  ngOnInit() {
  }

}

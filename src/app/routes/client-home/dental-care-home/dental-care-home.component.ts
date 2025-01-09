import { Component, OnInit } from '@angular/core';
import { ClientToolbarComponent } from '../client-toolbar/client-toolbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dental-care-home',
  standalone: true,
  imports: [
    ClientToolbarComponent,
    CommonModule
  ],
  templateUrl: './dental-care-home.component.html',
  styleUrls: ['./dental-care-home.component.scss']
})
export class DentalCareHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Function to navigate programmatically
  navigateTo(link: string): void {
    this.router.navigate([link]);
  }

  dentalCareDetails = {
    title: 'Comprehensive Dental Care for Your Pets at Dr. PawPaw Center',
    paragraphs: [
      'At Dr. PawPaw Center, we understand the importance of oral health for your pets. Dental care is an essential part of their overall well-being, and we are here to ensure they receive the best possible care.',
      'Our team of skilled professionals provides thorough dental check-ups, cleanings, and treatments to prevent and address dental issues such as plaque, tartar buildup, and gum disease.',
      'Regular dental care can help your pets avoid serious health problems caused by poor oral hygiene. Our goal is to keep your furry friends happy, healthy, and free of dental discomfort.',
      'With our advanced equipment and compassionate approach, we make dental visits stress-free for both you and your pets. Trust us to deliver the highest level of care for your beloved companions.'
    ],
    subtitle1: 'The Importance of Regular Dental Check-Ups',
    additionalDetails1: [
      'Routine dental check-ups are critical in detecting early signs of oral health issues. Our team uses state-of-the-art equipment to examine your pet’s teeth, gums, and overall oral health, ensuring any problems are addressed promptly.',
      'Early intervention can prevent pain, tooth loss, and the spread of infection to other parts of your pet’s body. A healthy smile leads to a healthier life!'
    ],
    subtitle2: 'Professional Dental Cleanings',
    additionalDetails2: [
      'Our dental cleanings are designed to remove plaque and tartar buildup that can’t be managed with brushing alone. Using safe and effective methods, we ensure your pet’s teeth are clean and their gums are healthy.',
      'Our procedures are carried out with the utmost care, keeping your pet comfortable throughout the process. Regular cleanings are a key component of maintaining long-term dental health.'
    ],
    subtitle3: 'Book Your Pet’s Dental Appointment Today!',
    closingParagraph: 'Dental health is just as important for pets as it is for humans. Don’t wait until your pet shows signs of discomfort—schedule their dental check-up now. A little preventative care goes a long way in ensuring their happiness and health.',
    contact: 'For more information on our dental care services, call us at 800-462-8749 or email info@drpawpawcenter.com.',
    bookAppointmentText: 'Book Appointment'
  };
}

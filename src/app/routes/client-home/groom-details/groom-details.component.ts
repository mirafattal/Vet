import { Component, OnInit } from '@angular/core';
import { ClientToolbarComponent } from '../client-toolbar/client-toolbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groom-details',
  standalone: true,
  imports: [
    ClientToolbarComponent,
    CommonModule
  ],
  templateUrl: './groom-details.component.html',
  styleUrls: ['./groom-details.component.scss']
})
export class GroomDetailsComponent implements OnInit {

  constructor(private router: Router) { }

  onBookNow(){
    this.router.navigate(['book-appointment']);
  }

  navigateTo(link: string): void {
    this.router.navigate([link]);
  }


  groomingDetails = {
    title: 'Professional Grooming Services for Happy, Healthy Pets at Dr. PawPaw Center',
    paragraphs: [
      'Regular grooming is essential for your pet’s health, comfort, and overall happiness. At Dr. PawPaw Center, we offer professional grooming services designed to keep your furry friends looking and feeling their best.',
      'Our experienced groomers provide a wide range of services, including bathing, haircuts, nail trims, ear cleaning, and more. We tailor our grooming sessions to meet the unique needs of your pet’s breed, coat type, and preferences.',
      'Beyond aesthetics, grooming plays a crucial role in maintaining your pet’s hygiene and preventing issues like matted fur, skin infections, and overgrown nails. Our gentle approach ensures a stress-free experience for your pet.',
      'Trust Dr. PawPaw Center for safe and effective grooming services that leave your pets clean, healthy, and happy. Our goal is to make grooming a positive and enjoyable experience for every pet.'
    ],
    subtitle1: 'The Benefits of Regular Grooming',
    additionalDetails1: [
      'Grooming isn’t just about appearances—it’s an important part of your pet’s overall health. Regular grooming helps detect early signs of skin problems, parasites, or other health concerns.',
      'A well-groomed pet is a happy pet! Grooming improves circulation, promotes a healthy coat, and reduces shedding, making your home cleaner and your pet more comfortable.'
    ],
    subtitle2: 'Customized Grooming Services',
    additionalDetails2: [
      'Every pet is unique, and we provide grooming services tailored to your pet’s specific needs. Whether it’s a simple bath or a complete spa treatment, we ensure your pet gets the care they deserve.',
      'Our groomers are trained to handle pets of all sizes and temperaments, ensuring a calm and positive experience for even the most nervous pets.'
    ],
    subtitle3: 'Book Your Pet’s Grooming Appointment Today!',
    closingParagraph: 'Don’t let grooming fall by the wayside—schedule an appointment today to give your pet the care they deserve. Regular grooming helps your pet stay healthy, happy, and comfortable.',
    contact: 'For more information about our grooming services, call us at 800-462-8749 or email grooming@drpawpawcenter.com.',
    bookAppointmentText: 'Book Appointment',
  };


  ngOnInit() {
  }

}

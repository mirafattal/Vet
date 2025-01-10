import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientToolbarComponent } from '../client-toolbar/client-toolbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-internal-medicine',
  standalone: true,
  imports: [
    ClientToolbarComponent,
    CommonModule
  ],
  templateUrl: './internal-medicine.component.html',
  styleUrls: ['./internal-medicine.component.scss']
})
export class InternalMedicineComponent implements OnInit {

  constructor(private router: Router) { }

  navigateTo(link: string): void {
    this.router.navigate([link]);
  }

  onBookNow(){
    this.router.navigate(['book-appointment']);
  }


  internalMedicineDetails = {
    title: 'Advanced Equine Internal Medicine at Dr. PawPaw Center',
    paragraphs: [
      'At Dr. PawPaw Center, we specialize in diagnosing and treating a wide range of internal health conditions in horses. Our equine internal medicine services focus on providing comprehensive care to ensure your horse’s health and well-being.',
      'Our highly trained veterinarians use state-of-the-art diagnostic tools and techniques to evaluate and treat internal issues, such as respiratory problems, gastrointestinal disorders, and metabolic diseases.',
      'Horses are complex animals, and their internal health requires specialized knowledge and attention. We work closely with horse owners to develop tailored treatment plans that address your horse’s specific needs.',
      'Trust Dr. PawPaw Center for compassionate and professional care. Our team is committed to keeping your horse healthy and comfortable, whether they’re a working horse, a competitive athlete, or a beloved companion.'
    ],
    subtitle1: 'Comprehensive Diagnostics and Treatment',
    additionalDetails1: [
      'Our diagnostic capabilities include advanced imaging, laboratory testing, and endoscopy to accurately identify internal health issues in horses.',
      'Early detection and treatment are key to maintaining your horse’s health. We create personalized treatment plans to address conditions promptly and effectively.'
    ],
    subtitle2: 'Expert Care for Complex Conditions',
    additionalDetails2: [
      'From colic management to respiratory therapies, our team has the expertise to handle a variety of complex equine health conditions. We prioritize your horse’s comfort and recovery throughout the process.',
      'We stay updated on the latest advancements in equine medicine to provide the highest level of care for your horse.'
    ],
    subtitle3: 'Schedule a Consultation for Your Horse',
    closingParagraph: 'Your horse’s health is our top priority. Regular check-ups and prompt attention to health concerns are essential to ensuring their well-being. Contact us today to discuss your horse’s needs and schedule an appointment.',
    contact: 'For more information on our equine internal medicine services, call us at 800-462-8749 or email equine@drpawpawcenter.com.',
    bookAppointmentText: 'Book Appointment',
  };


  ngOnInit() {
  }

}

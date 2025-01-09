import { Component, OnInit } from '@angular/core';
import { ClientToolbarComponent } from '../client-toolbar/client-toolbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dog-training-home',
  standalone: true,
  imports: [
    ClientToolbarComponent,
    CommonModule
  ],
  templateUrl: './dog-training-home.component.html',
  styleUrls: ['./dog-training-home.component.scss']
})
export class DogTrainingHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo(link: string): void {
    this.router.navigate([link]);
  }

  dogTrainingDetails = {
    title: 'Dog Training at Dr. PawPaw Center',
    paragraphs: [
      'At Dr. PawPaw Center, we are dedicated to providing top-notch training programs tailored to meet the unique needs of your dog.',
      'From basic obedience to advanced behavior modification, our certified trainers use positive reinforcement techniques to help your furry friend become a well-mannered companion.',
      'Our training programs are designed to strengthen the bond between you and your dog while fostering a happy and confident pet.'
    ],
    subtitle1: 'What to Expect During Dog Training at Dr. PawPaw Center',
    additionalDetails1: [
      'Our dog training sessions are conducted in a safe, friendly environment where your dog can learn and grow without stress. Each program begins with a comprehensive assessment to understand your dog\'s personality, temperament, and training needs.',
      'Whether your dog needs help with basic commands like sit and stay, or more complex issues such as leash pulling or separation anxiety, our trainers are equipped with the skills and patience to bring out the best in your furry companion.'
    ],
    subtitle2: 'Customized Training Programs',
    additionalDetails2: [
      'At Dr. PawPaw Center, we understand that every dog is unique. That’s why we offer personalized training programs to ensure your pet’s specific needs are addressed. Our team works closely with you to set training goals and track progress throughout the program.',
      'Our programs include individual sessions, group classes, and even in-home training options for your convenience.'
    ],
    subtitle3: 'Book Your Dog Training Session Today!',
    closingParagraph: 'Give your dog the gift of learning and development with our professional training services. A well-trained dog is a happy dog, and we’re here to help you every step of the way.',
    contact: 'For more information on our dog training services in San Diego, call us at 80-462-879 or email info@drpawpawcenter.com.',
    bookAppointmentText: 'Book Appointment'
  };
}

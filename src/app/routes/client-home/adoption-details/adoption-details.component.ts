import { Component, OnInit } from '@angular/core';
import { ClientToolbarComponent } from '../client-toolbar/client-toolbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adoption-details',
  standalone: true,
  imports:[
    ClientToolbarComponent,
    CommonModule
  ],
  templateUrl: './adoption-details.component.html',
  styleUrls: ['./adoption-details.component.scss']
})
export class AdoptionDetailsComponent implements OnInit {

  navigateTo(link: string): void {
    this.router.navigate([link]);
  }

  onAdoptNow(){
    this.router.navigate(['pet-for-adoption']);
  }

  constructor(private router: Router) { }

  adoptionDetails = {
    title: 'Adopt Your Next Furry Friend at Dr. PawPaw Center',
    paragraphs: [
      'At Dr. PawPaw Center, we are committed to finding loving homes for pets in need. Adopting a pet is a rewarding experience that brings joy to both you and your new companion.',
      'Our adoption process is designed to ensure that every pet finds a caring and suitable home. We take the time to match each animal with the right family, considering their personality, needs, and preferences.',
      'By adopting a pet from us, you’re not just gaining a new family member—you’re also giving a second chance to a loving animal. Each adoption helps us continue our mission to provide care and shelter to pets in need.',
      'Let us guide you through the journey of adoption. Together, we can make a positive impact on the lives of pets and create lasting bonds with their new families.'
    ],
    subtitle1: 'Why Adopt from Dr. PawPaw Center?',
    additionalDetails1: [
      'We provide thorough health check-ups and vaccinations for all pets before they are made available for adoption, ensuring they are healthy and ready for their new homes.',
      'Our team is here to answer any questions you may have and to help you find the perfect pet for your family. We believe in responsible pet ownership and are dedicated to supporting you every step of the way.'
    ],
    subtitle2: 'Meet Your Perfect Match',
    additionalDetails2: [
      'Our adoption process includes meeting the pets, learning about their behavior and needs, and finding the best match for your household. We aim to create lifelong partnerships between pets and their new families.',
      'Take your time to bond with the animals and let us help you make an informed decision. Every pet has a unique story and a lot of love to give!'
    ],
    subtitle3: 'Start Your Adoption Journey Today!',
    closingParagraph: 'Adopting a pet is a life-changing decision, and we’re here to make it as smooth and joyful as possible. Visit us at Dr. PawPaw Center to meet your future furry friend and give them the loving home they deserve.',
    contact: 'For more information about our adoption program, call us at 800-462-8749 or email adoptions@drpawpawcenter.com.',
    bookAppointmentText: 'Adopt Now',
  };


  ngOnInit() {
  }

}

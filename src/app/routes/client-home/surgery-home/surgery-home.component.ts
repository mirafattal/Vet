import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenu } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ClientToolbarComponent } from '../client-toolbar/client-toolbar.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-surgery-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule,
    ClientToolbarComponent
  ],
  templateUrl: './surgery-home.component.html',
  styleUrl: './surgery-home.component.scss'
})
export class SurgeryHomeComponent {

  constructor(private router: Router) {}

  // Function to navigate programmatically
  navigateTo(link: string): void {
    this.router.navigate([link]);
  }
  surgeryDetails = {
    title: 'Surgery at Dr. PawPaw Center',
    paragraphs: [
      'Our veterinarian near San Diego is available for the surgical needs of your animal.',
      'When your animal needs surgery, you need to find a practice that can administer both gentle and effective treatment to your beloved companion. From routine procedures, such as spaying or neutering, to more advanced operations, your pet may need to undergo surgery for any number of reasons.',
      'Our staff is trained to give your pet the care and compassion they need to not only successfully make it through the operation but to lead a healthier and happier life when they return from our facilities.'
    ],
    subtitle1: 'What to Expect During Surgery at Dr. PawPaw Center',
    additionalDetails1: [
      'The modern amenities and pristine conditions of our surgical rooms enable our staff to function at peak capacity. At Dr. PawPaw Center, we do everything in our power to streamline your experience so that all lab work and pre-surgical exams are completed in a timely manner. Our resources not only help our staff feel supported, they can also help your pet feel more comfortable in an unfamiliar place. We recommend a follow-up with each of our clients so we can catch small problems before they turn into larger ones.',
      "You can expect our staff's complete attention when your pet is in the surgical room. Veterinary surgery often requires multiple professionals working together, which is why we make sure your pet's temperature, IV fluids, and anesthesia are constantly monitored and adjusted by a trained technician. Our team works together to communicate any potential anomalies that may compromise the efficacy of the surgery. We've found this strategy to be the best possible way to ensure favorable outcomes."
    ],
    subtitle2: 'Before Surgery',
    additionalDetails2: [
      'Before the surgery, we use the conclusions from the pre-surgery exam and the accompanying lab work to determine which methods to use during the operation. After the surgery, we design pain management strategies specific to your pet\'s size, breed, and condition.'
    ],
    subtitle3: 'After Surgery',
    additionalDetails3: [
      'It\'s Dr. PawPaw Center’s goal to give you all the advice you need to properly care for your pet from the moment they come home from the surgery. Taking an all-around approach to surgical care is the best path to achieving better pet health, and we want our clients to feel as empowered as we do to help.'
    ],
    subtitle4: 'Gentle and Effective Surgical Treatment at Dr. PawPaw Center',
    closingParagraph: 'Visiting our facilities is the first step to learning more about how we manage to stand out. We can answer any questions you may have about the procedure, so you can feel comfortable about how your pet is being treated. From the type of anesthesia used to the length of post-care recovery, Dr. PawPaw Center gives you all the information you need to know so there are no surprises down the line.',
    contact: 'For more information on our animal surgical services in San Diego, call us at 80-462-879 today.'
  };

}

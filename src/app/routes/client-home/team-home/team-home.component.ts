import { Component, OnInit } from '@angular/core';
import { ClientToolbarComponent } from '../client-toolbar/client-toolbar.component';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-home',
  standalone: true,
  imports: [
    ClientToolbarComponent,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './team-home.component.html',
  styleUrls: ['./team-home.component.scss']
})
export class TeamHomeComponent implements OnInit {

  teamMembers = [
    {
      name: 'Dr. Jane Doe',
      role: 'Head Veterinarian',
      bio: 'Dr. Jane has over 10 years of experience in small animal surgery and care.',
      image: 'images/MyImages/team2.webp'
    },
    {
      name: 'Dr. John Smith',
      role: 'Veterinary Surgeon',
      bio: 'Specializing in orthopedic surgery, Dr. John ensures top-notch care for pets in need.',
      image: 'images/MyImages/team5.webp'
    },
    {
      name: 'Sarah Brown',
      role: 'Veterinary Nurse',
      bio: 'With her gentle touch and expertise, Sarah makes sure every pet feels at ease during treatment.',
      image: 'images/MyImages/team3.webp'
    },
    {
      name: 'Dr. Emily Taylor',
      role: 'Equine Specialist (Horse Doctor)',
      bio: 'Dr. Emily is an expert in horse care, from routine checkups to complex procedures.',
      image: 'images/MyImages/team4.webp'
    },
    {
      name: 'Michael Reed',
      role: 'Animal Behaviorist',
      bio: 'Michael specializes in pet behavior training, helping pets and their owners communicate better.',
      image: 'images/MyImages/team1.webp'
    },
    {
      name: 'Cole Carter',
      role: 'Manager',
      bio: 'Cole is an experienced manager who oversees the clinic operations and ensures the team provides excellent care to pets.',
      image: 'images/MyImages/team6.webp'
    }
  ];

  constructor(private router: Router) { }

  navigateTo(link: string): void {
    this.router.navigate([link]);
  }

  ngOnInit() {
  }

}

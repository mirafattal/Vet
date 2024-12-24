import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenu } from '@angular/material/menu';
import { Router } from '@angular/router';


@Component({
  selector: 'app-surgery-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule
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
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

}

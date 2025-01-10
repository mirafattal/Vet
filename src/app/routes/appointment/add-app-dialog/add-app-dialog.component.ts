import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-app-dialog',
  standalone: true,
  imports:[
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './add-app-dialog.component.html',
  styleUrls: ['./add-app-dialog.component.scss']
})
export class AddAppDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AddAppDialogComponent } from './add-app-dialog/add-app-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { APIClient, AppoiAnimalNameDto, GetStaffNamesdto } from '@shared/services/api-client/veterinary-api.service';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [DatePipe],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  todayDate: string = '';
appointAnimalThisWeek: AppoiAnimalNameDto[] = [];
appointAnimalThisMonth: AppoiAnimalNameDto[] = [];
appointAnimalNextMonth: AppoiAnimalNameDto[] = [];
selectedTimeRange: string = 'thisWeek';  // Default selection is 'thisWeek'
filteredAppointments: AppoiAnimalNameDto[] = [];

staffList: GetStaffNamesdto[] = [];
selectedStaffId: number | undefined |null = null; // Declare the selectedStaffId with a default value (null)

getAppointmentsThisWeek() {
  this.apiService.getAnimalAndAppoinThisWeek().subscribe((appointAnimal: AppoiAnimalNameDto[]) => {
    console.log(appointAnimal);
    this.appointAnimalThisWeek = appointAnimal;

    // Filter by staffId before sorting
    if (this.selectedStaffId) {
      this.appointAnimalThisWeek = this.appointAnimalThisWeek.filter(appointAnimal =>
        appointAnimal.staffId === this.selectedStaffId);
    }
    this.appointAnimalThisWeek.sort((a, b) => {
      const dateA = a.appointmentDate ? new Date(a.appointmentDate) : new Date(0); // Default to epoch if undefined
      const dateB = b.appointmentDate ? new Date(b.appointmentDate) : new Date(0); // Default to epoch if undefined
      return dateA.getTime() - dateB.getTime(); // Ascending order
    });

    appointAnimal.forEach(appointAnimal => {
        console.log('Animal Name:', appointAnimal.animalName);
        console.log('Owner Name:', appointAnimal.fullName);
        console.log('Slot Time:', appointAnimal.slotStartTime);
    });
  });
}

getAppointmentsThisMonth() {
  this.apiService.getAnimalAndAppoinThisMonth().subscribe((appointAnimal: AppoiAnimalNameDto[]) => {
    console.log(appointAnimal);
    this.appointAnimalThisMonth = appointAnimal;

    if (this.selectedStaffId) {
      this.appointAnimalThisWeek = this.appointAnimalThisMonth.filter(appointAnimal =>
        appointAnimal.staffId === this.selectedStaffId);
    }
    this.appointAnimalThisMonth.sort((a, b) => {
      // Sort by appointmentDate first
      const dateA = a.appointmentDate ? new Date(a.appointmentDate) : new Date(0);
      const dateB = b.appointmentDate ? new Date(b.appointmentDate) : new Date(0);

      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime(); // Ascending order by date
      }

      // If appointmentDate is the same, sort by slotStartTime (time comparison)
      const [hourA, minuteA] = a.slotStartTime ? a.slotStartTime.split(':').map(Number) : [0, 0];
      const [hourB, minuteB] = b.slotStartTime ? b.slotStartTime.split(':').map(Number) : [0, 0];

      // Compare hours first
      if (hourA !== hourB) {
        return hourA - hourB; // Ascending order by hour
      }
      console.log(`Comparing times: ${hourA}:${minuteA} vs ${hourB}:${minuteB}`);
      // If hours are the same, compare minutes
      return minuteA - minuteB; // Ascending order by minute

    });


  });
}

getAppointmentsNextMonth() {
  this.apiService.getAnimalAndAppoinNextMonth().subscribe((appointAnimal: AppoiAnimalNameDto[]) => {
    console.log(appointAnimal);
    this.appointAnimalNextMonth = appointAnimal;

    if (this.selectedStaffId) {
      this.appointAnimalThisWeek = this.appointAnimalNextMonth.filter(appointAnimal =>
        appointAnimal.staffId === this.selectedStaffId);
    }
    this.appointAnimalNextMonth.sort((a, b) => {
      const dateA = a.appointmentDate ? new Date(a.appointmentDate) : new Date(0); // Default to epoch if undefined
      const dateB = b.appointmentDate ? new Date(b.appointmentDate) : new Date(0); // Default to epoch if undefined
      return dateA.getTime() - dateB.getTime(); // Ascending order
    });

    appointAnimal.forEach(appointAnimal => {
        console.log('Animal Name:', appointAnimal.animalName);
        console.log('Owner Name:', appointAnimal.fullName);
        console.log('Slot Time:', appointAnimal.slotStartTime);
    });
  });
}

getStaffNames(){
  this.apiService.getStaffNames().subscribe((staff: GetStaffNamesdto[]) => {
    console.log(staff);
    this.staffList = staff;
    this.selectedStaffId = staff.length > 0 ? staff[0].staffId : null;
})
}

constructor(private dialog: MatDialog, private apiService: APIClient) {}

ngOnInit(): void {
  this.todayDate = new Date().toUTCString(); // Display today's UTC date dynamically
  this.getAppointmentsThisMonth();
  this.getAppointmentsThisWeek();
  this.getAppointmentsNextMonth();
  this.getStaffNames();
}


// Filter appointments based on selected time range
filterAppointments() {
  switch (this.selectedTimeRange) {
    case 'thisWeek':
      this.filteredAppointments = this.appointAnimalThisWeek;
      break;
    case 'thisMonth':
      this.filteredAppointments = this.appointAnimalThisMonth;
      break;
    case 'nextMonth':
      this.filteredAppointments = this.appointAnimalNextMonth;
      break;
    default:
      this.filteredAppointments = [];
  }
   // Now filter by staffId, if selectedStaffId is available
   if (this.selectedStaffId) {
    this.filteredAppointments = this.filteredAppointments.filter(appointment => appointment.staffId === this.selectedStaffId);
  }
}
  reschedule(appointment: any): void {
    console.log('Reschedule clicked for:', appointment);
    // Logic for rescheduling
  }

  viewDetails(appointment: any): void {
    console.log('View details clicked for:', appointment);
    // Logic for viewing details
  }

  openAddAppointmentDialog(): void {
    const dialogRef = this.dialog.open(AddAppDialogComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed:', result);
      // Optionally refresh the appointment list
      //this.getAppointments();
    });
  }

}

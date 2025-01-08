import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ClientToolbarComponent } from '../client-toolbar/client-toolbar.component';
import { CommonModule } from '@angular/common';
import { APIClient, BookAppointmentDto, DoctorSlotDto, GetStaffNamesdto, StaffDto, StaffWithRoleDTO } from '@shared/services/api-client/veterinary-api.service';
import { FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-app',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    ClientToolbarComponent,
    CommonModule,
    MatStepperModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './book-app.component.html',
  styleUrls: ['./book-app.component.scss'],
  providers: [DatePipe]
})
export class BookAppComponent implements OnInit {

  doctorNames: StaffWithRoleDTO[] = [];
  staffWithRoles: StaffWithRoleDTO[] = [];
  StaffName: GetStaffNamesdto[] = []; // Initialize as an empty array by default
  selectedDoctorId: number | null = null; // Selected doctor
  availableDates: Date[] = []; // Dates available for the selected doctor
  availableTimes: string[] = []; // Times available for the selected date
  selectedDate: Date | null = null; // User-selected date
  selectedTime: string | null = null; // User-selected time
  selectedSlotId: number | null = null; // DoctorSlotId for booking
  appointmentReason: string = '';
  slots: { slotDate: Date; slotStartTime: string; doctorSlotId: number }[] = []; // All slots from the backend

  constructor(private router: Router, private apiService: APIClient, private datePipe: DatePipe) { }

  ngOnInit() {
    this.loadDoctors();
    this.loadAvailableSlots();
  }


  loadDoctors(): void {
    this.apiService.getStaffNames().subscribe(
      (data: GetStaffNamesdto[]) => {
        this.StaffName = data; // Store the staff names as an array
      },
      (error) => {
        console.error('Error fetching staff names:', error);
      }
    );

    this.apiService.staffwithroles().subscribe(
      (staff) => {
        this.staffWithRoles = staff;

        // Filter for both 'Pet Doctor' and 'Horse Doctor'
        this.doctorNames = staff.filter(
          (s) => s.roleName === 'Pet Doctor' || s.roleName === 'Horse Doctor'
        );
      },
      (error) => {
        console.error('Error fetching staff with roles:', error);
      }
    );
  }




  loadAvailableSlots(): void {
    if (this.selectedDoctorId) {
      // Define a date range: current date to one month from now
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1); // Set the endDate to one month from now

      // Convert to the 'yyyy-MM-dd' format expected by the backend
      const startDateStr = startDate.toISOString().split('T')[0]; // Get the date part (YYYY-MM-DD)
      const endDateStr = endDate.toISOString().split('T')[0]; // Get the date part (YYYY-MM-DD)

      // Now call the API with the formatted dates
      this.apiService.getAvailableSlots(this.selectedDoctorId, startDateStr, endDateStr).subscribe(
        (data: DoctorSlotDto[]) => {
          // Process the slots data as before
          const validSlots = data
            .filter((slot) => slot.slotDate !== null && slot.slotDate !== undefined && slot.slotStartTime
            !== null && slot.slotStartTime !== undefined)
            .map((slot) => ({
              ...slot,
              slotDate: new Date(slot.slotDate!), // Ensure slotDate is a valid Date object
            }));

          this.slots = validSlots as { slotDate: Date; slotStartTime: string; doctorSlotId: number }[];
          this.availableDates = [...new Set(validSlots.map((slot) => slot.slotDate))];
          this.availableTimes = validSlots
            .map((slot) => slot.slotStartTime)
            .filter((time): time is string => time !== null && time !== undefined);

          console.log('Available slots:', data);
          console.log('Available dates:', this.availableDates);
          console.log('Available times:', this.availableTimes);
        },
        (error) => {
          console.error('Error fetching available slots:', error);
        }
      );
    }
  }




  onDoctorChange(doctorId: number): void {
    // Step 1: Update the selectedDoctorId with the new doctorId
    this.selectedDoctorId = doctorId;
    console.log('Selected Doctor:', this.selectedDoctorId);  // Log selected doctor ID

    // Step 2: Clear previously selected date, time, and slot (if any)
    this.selectedDate = null;
    this.selectedTime = null;
    this.selectedSlotId = null;

    // Log clearing of previous values
    console.log('Cleared previous selections - Date:', this.selectedDate, 'Time:', this.selectedTime, 'Slot ID:', this.selectedSlotId);

    // Step 3: Call the method to load available slots for the selected doctor
    this.loadAvailableSlots();
  }


  onDateChange(selectedDate: Date): void {
    // Ensure the selected date is correct
    console.log('Selected Date:', selectedDate);

    // Filter the available slots for the selected date
    const filteredSlots = this.slots.filter(
      (slot) => new Date(slot.slotDate).toDateString() === selectedDate.toDateString()
    );

    // Update availableTimes with valid times
    this.availableTimes = filteredSlots.map((slot) => slot.slotStartTime);

    // Check the updated availableTimes
    console.log('Available Times:', this.availableTimes);
  }

  onTimeChange(selectedTime: string): void {
    this.selectedTime = selectedTime; // Store the selected time

    // Find the doctorSlotId for the selected date and time
    const matchingSlot = this.slots.find(
      (slot) =>
        new Date(slot.slotDate).toDateString() === this.selectedDate?.toDateString() &&
        slot.slotStartTime === selectedTime
    );

    this.selectedSlotId = matchingSlot ? matchingSlot.doctorSlotId : null;
  }


  showConfirmationMessage: boolean = false; // Controls whether to show the confirmation message

appointmentDetails: string = ''; // Stores the appointment details
submitAppointment(): void {
  if (this.selectedDoctorId && this.selectedDate && this.selectedTime && this.selectedSlotId) {
    // Create a new instance of BookAppointmentDto
    const appointmentData = new BookAppointmentDto();

    // Set its properties
    appointmentData.appointmentId = 0;
    appointmentData.staffId = this.selectedDoctorId;
    appointmentData.appointmentDate = this.selectedDate;
    appointmentData.doctorSlotId = this.selectedSlotId;
    appointmentData.appointmentReason = this.appointmentReason || null; // Optional reason
    appointmentData.animalId = 2; // Temporary animalId for testing

    // Debugging: Log the appointment data being sent
    console.log('Booking appointment with data:', appointmentData);

    // Make the API call to book the appointment
    this.apiService.bookAppointment(appointmentData).subscribe(
      (response) => {
        console.log('Raw response:', response); // Log the raw response
        console.log('Appointment booked successfully:', response);

        // Ensure selectedDate is not null before formatting
        if (this.selectedDate) {
          const formattedDate = new Date(this.selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          this.appointmentDetails = `Your appointment will be on ${formattedDate} at ${this.selectedTime}.`;
        } else {
          this.appointmentDetails = 'Date selection is invalid.';
        }

        // Set the flag to show the confirmation message
        this.showConfirmationMessage = true;

        // Reset fields after successful booking
        this.selectedDoctorId = null;
        this.selectedDate = null;
        this.selectedTime = null;
        this.selectedSlotId = null;
        this.availableDates = [];
        this.availableTimes = [];
      },
      (error) => {
        console.error('Error booking appointment:', error);

        if (error.error) {
          console.error('Backend error details:', error.error);
        }

        alert('There was an error booking your appointment. Please check the console for details.');
      }
    );
  } else {
    console.log('Validation failed - Missing fields');
    alert('Please fill out all fields before booking an appointment.');
  }
}





  navigateTo(link: string): void {
    this.router.navigate([link]);
  }
}

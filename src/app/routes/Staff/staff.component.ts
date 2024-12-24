import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddingStaffComponent } from './adding-staff/adding-staff.component';
import { APIClient, StaffWithRoleDTO } from '@shared/services/api-client/veterinary-api.service';
import { CommonModule } from '@angular/common';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-content',
  templateUrl: 'staff.component.html',
  styleUrl: './staff.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    RouterModule,
    MatIconModule
  ]
})
export class StaffComponent implements OnInit {

  staff: StaffWithRoleDTO[] = [];
  displayedColumns = ['StaffName', 'Address', 'Phone', 'Role', 'CV', 'actions'];
  dataSource = new MatTableDataSource<any>([]); // Initialize with an empty array
  staffId: number | null = null;

   constructor(private apiService: APIClient, private router: Router,
        private route: ActivatedRoute,) {}

      ngOnInit(): void {
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const filterValue = filter.trim().toLowerCase();
          return (
            data.roleName.toLowerCase().includes(filterValue) ||
            data.fullName.toLowerCase().includes(filterValue)
          );
        }

          // Fetch data after the animalId is set
          this.fetchData();

      }

      fetchData(): void {
        this.apiService.staffwithroles().subscribe(
          (staffResponse) => {
            console.log('staff Records:', staffResponse); // Log the whole response to inspect the structure

            // Assuming the response is an array of staff records
            if (staffResponse && staffResponse.length > 0) {
              this.staff = staffResponse; // Assign data to the staff array

              // Assign the staff data to the MatTableDataSource
              this.dataSource.data = this.staff.map(staff => ({
                staffId: staff.staffId,
                fullName: staff.fullName,
                address: staff.address,
                phone: staff.phone,
                roleName: staff.roleName, // Assuming roleName is part of the staff object
              }));
              console.log('DataSource updated:', this.dataSource.data);
            } else {
              console.log('No staff data found');
              this.dataSource.data = []; // Reset table if no staff data
            }
          },
          (error) => {
            console.error('Error fetching staff records:', error);
          }
        );
      }


      applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }

      onEdit(row: any): void {
        console.log('Edit action clicked for:', row);
        // Add logic to edit details
      }

      onDelete(row: any): void {
        console.log('staff ID to delete:', row.staffId); // Log the ownerId
        console.log('Delete action clicked for:', row);

        // Confirm the deletion action (optional)
        const confirmDelete = window.confirm(`Are you sure you want to delete ${row.fullName}?`);
        if (!confirmDelete) {
          return; // If user cancels, do nothing
        }

        // Call the backend service to delete the owner and animal
        this.apiService.deleteById8(row.ownerId).subscribe({
          next: (response) => {
            console.log('Delete successful:', response);
            // Update the UI (remove the row from the table, etc.)
            this.removeRowFromTable(row);
            alert('Staff has been deleted successfully!');
          },
          error: (err) => {
            console.error('Error deleting staff:', err);
            alert('Failed to delete one of the staff members!');
          }
        });
      }

      removeRowFromTable(row: any): void {
        // Implement logic to remove the deleted row from your displayed data
        const index = this.staff.findIndex(item => item.staffId === row.staffId);
        if (index !== -1) {
          this.staff.splice(index, 1);  // Remove the row from your data array
        }
      }

      readonly dialog = inject(MatDialog);
      openDialog() {
        this.dialog.open(AddingStaffComponent, {
          disableClose: true, // Prevents closing on outside click or Escape key
        });
      }


      getRoleClass(roleName: string): string {
        // Normalize the role name by trimming and converting it to lowercase
        const normalizedRole = roleName.trim().toLowerCase();

        switch (normalizedRole) {
          case 'manager':
            return 'role-manager';
          case 'nurse':
            return 'role-nurse';
          case 'pet doctor':
            return 'role-pet-doctor';
          case 'horse doctor':
            return 'role-horse-doctor';
          case 'receptionist':
            return 'role-receptionist';
          default:
            return 'role-unknown'; // Default class for unknown roles
        }
      }

      onFileSelected(event: Event, row: any): void {
        const fileInput = event.target as HTMLInputElement;

        if (fileInput.files && fileInput.files.length > 0) {
          const file = fileInput.files[0];
          console.log('Selected file:', file);

          // Create a FileParameter object
          const fileParameter = {
            data: file, // The actual file object (Blob or File)
            fileName: file.name // The file name
          };

          // Call the API service to upload the CV with both parameters
          this.apiService.uploadcv(fileParameter, row.staffId).subscribe({
            next: () => {
              alert('CV uploaded successfully!');
              row.cvFile = file.name; // Save file name to the row (or use a URL from backend)
            },
            error: (err) => {
              console.error('Error uploading CV:', err);
              alert('Failed to upload CV.');
            },
          });
        }
      }

      // downloadCV(row: any): void {
      //   if (row.staffId) {
      //     // Call the API service to download the CV
      //     this.apiService.downloadcv(row.staffId).subscribe({
      //       next: (response: Blob) => {
      //         const url = window.URL.createObjectURL(response);
      //         const a = document.createElement('a');
      //         a.href = url;
      //         a.download = `CV_${row.staffId}.pdf`; // Customize the file name as needed
      //         document.body.appendChild(a); // Append to the body
      //         a.click(); // Trigger the download
      //         document.body.removeChild(a); // Remove the element after download
      //         window.URL.revokeObjectURL(url); // Clean up the URL object
      //       },
      //       error: (err) => {
      //         console.error('Error downloading CV:', err);
      //         alert('Failed to download CV.');
      //       },
      //     });
      //   } else {
      //     alert('No CV uploaded for this staff member.');
      //   }
      // }
}

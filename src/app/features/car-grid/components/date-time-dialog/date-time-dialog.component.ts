import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { formatISO } from 'date-fns';

@Component({
  selector: 'app-date-time-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './date-time-dialog.component.html',
  styleUrls: ['./date-time-dialog.component.css'],
})
export class DateTimeDialogComponent {
  selectedDate: Date = new Date();
  selectedTime: string = '12:00';

  constructor(
    private dialogRef: MatDialogRef<DateTimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.dateTime) {
      const parsed = new Date(data.dateTime);
      this.selectedDate = parsed;

      // Extract HH:mm
      const hours = parsed.getHours().toString().padStart(2, '0');
      const minutes = parsed.getMinutes().toString().padStart(2, '0');
      this.selectedTime = `${hours}:${minutes}`;
    }
  }

  onConfirm(): void {
    if (this.selectedDate && this.selectedTime) {
      const [hours, minutes] = this.selectedTime.split(':').map(Number);
      const dateWithTime = new Date(this.selectedDate);
      dateWithTime.setHours(hours, minutes, 0);

      const formatted = formatISO(dateWithTime); 
      this.dialogRef.close(formatted);
    } else {
      this.dialogRef.close(); 
    }
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }
}

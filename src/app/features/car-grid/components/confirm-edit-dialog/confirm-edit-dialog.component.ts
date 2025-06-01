import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './confirm-edit-dialog.component.html',
})
export class ConfirmEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { oldValue: string; newValue: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close('cancel');
  }

  onConfirm(): void {
    this.dialogRef.close('confirm');
  }
}

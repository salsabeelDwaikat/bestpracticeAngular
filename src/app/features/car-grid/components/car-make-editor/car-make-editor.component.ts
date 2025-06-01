import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ConfirmEditDialogComponent } from '../confirm-edit-dialog/confirm-edit-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-make-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule, MatDialogModule, ConfirmEditDialogComponent],
  templateUrl: './car-make-editor.component.html',
})
export class CarMakeEditorComponent implements ICellEditorAngularComp {
  @Input() params: any;
  value: string = '';
  originalValue: string = '';
  makes: string[] = ['Toyota', 'Honda', 'Ford', 'BMW', 'Chevrolet'];

  constructor(private dialog: MatDialog) {}

  agInit(params: any): void {
    this.params = params;
    this.value = params.value ?? '';
    this.originalValue = this.value;
  }

  async onSelectionChange(event: any): Promise<void> {
    const newValue = event.value;
    const oldValue = this.originalValue;

    if (newValue === oldValue) {
      this.params.api.stopEditing();
      return;
    }

    const dialogRef = this.dialog.open(ConfirmEditDialogComponent, {
      data: { oldValue, newValue },
    });

    const result = await dialogRef.afterClosed().toPromise();

    if (result === 'confirm') {
      this.value = newValue;
      this.params.api.stopEditing();
    } else {
      this.params.api.stopEditing(true); // cancel editing
    }
  }

  getValue(): string {
    return this.value;
  }

  onBlur(): void {
    // Do nothing here, as editing is controlled by the dialog
  }
}

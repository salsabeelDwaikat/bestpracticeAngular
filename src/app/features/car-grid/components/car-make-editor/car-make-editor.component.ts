import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-car-make-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule],
  templateUrl: './car-make-editor.component.html',
})
export class CarMakeEditorComponent implements ICellEditorAngularComp {
  @Input() params: any;
  value: string = '';
  makes: string[] = ['Toyota', 'Honda', 'Ford', 'BMW', 'Chevrolet'];

  agInit(params: any): void {
    this.params = params;
    this.value = params.value ?? '';
  }

  getValue(): string {
    return this.value;
  }

  onSelectionChange(event: any): void {
    this.value = event.value;
  }

  onBlur(): void {
    this.params.api.stopEditing();
  }
}

import {
  Component,
  AfterViewInit
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DateTimeDialogComponent } from '../date-time-dialog/date-time-dialog.component';

import {
  ICellEditorParams,
  ICellEditorComp,
  AgPromise
} from 'ag-grid-community';

@Component({
  selector: 'app-date-time-picker-editor',
  standalone: true,
  imports: [MatDialogModule, DateTimeDialogComponent],
  template: '',
})
export class DateTimePickerEditorComponent
  implements ICellEditorComp, AfterViewInit
{
  private params!: ICellEditorParams;
  private value: string = '';

  constructor(private dialog: MatDialog) {}
  refresh?(params: ICellEditorParams<any, any, any>): void {
    throw new Error('Method not implemented.');
  }
  afterGuiAttached?(): void {
    throw new Error('Method not implemented.');
  }
  getPopupPosition?(): 'over' | 'under' | undefined {
    throw new Error('Method not implemented.');
  }
  isCancelBeforeStart?(): boolean {
    throw new Error('Method not implemented.');
  }
  isCancelAfterEnd?(): boolean {
    throw new Error('Method not implemented.');
  }
  focusIn?(): void {
    throw new Error('Method not implemented.');
  }
  focusOut?(): void {
    throw new Error('Method not implemented.');
  }
  getGui(): HTMLElement {
    throw new Error('Method not implemented.');
  }
  destroy?(): void {
    throw new Error('Method not implemented.');
  }
  init?(params: ICellEditorParams<any, any, any>): AgPromise<void> | void {
    throw new Error('Method not implemented.');
  }

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.value = params.value || '';
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.openDialog(), 0);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DateTimeDialogComponent, {
      width: '300px',
      data: { dateTime: this.value },
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result) {
        this.value = result;
      }
      this.params.api!.stopEditing(); 
    });
  }

  getValue(): any {
    return this.value;
  }

  isPopup(): boolean {
    return true;
  }
}

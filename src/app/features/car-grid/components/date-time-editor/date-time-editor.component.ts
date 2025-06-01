import {
  Component,
  AfterViewInit
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DateTimeDialogComponent } from '../date-time-dialog/date-time-dialog.component';
import { ConfirmEditDialogComponent } from '../confirm-edit-dialog/confirm-edit-dialog.component';

import {
  ICellEditorParams,
  ICellEditorComp,
  AgPromise
} from 'ag-grid-community';

@Component({
  selector: 'app-date-time-picker-editor',
  standalone: true,
  imports: [MatDialogModule, DateTimeDialogComponent, ConfirmEditDialogComponent],
  template: '',
})
export class DateTimePickerEditorComponent
  implements ICellEditorComp, AfterViewInit
{
  private params!: ICellEditorParams;
  private value: string = '';
  private originalValue: string = '';

  constructor(private dialog: MatDialog) {}

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.value = params.value || '';
    this.originalValue = this.value;
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.openDateTimeDialog(), 0);
  }

  openDateTimeDialog(): void {
    const dialogRef = this.dialog.open(DateTimeDialogComponent, {
      width: '300px',
      data: { dateTime: this.value },
    });

    dialogRef.afterClosed().subscribe((newDateTime: string | undefined) => {
      if (!newDateTime || newDateTime === this.originalValue) {
        this.params.api!.stopEditing(true); // cancel if no change or no value
        return;
      }

      const confirmRef = this.dialog.open(ConfirmEditDialogComponent, {
        data: {
          oldValue: this.originalValue,
          newValue: newDateTime,
        },
      });

      confirmRef.afterClosed().subscribe((confirmResult: string) => {
        if (confirmResult === 'confirm') {
          this.value = newDateTime;

          // ✅ Suppress confirmation dialog in CarGridComponent
          if (
            this.params.context &&
            this.params.context.componentParent &&
            'suppressConfirmationDialog' in this.params.context.componentParent
          ) {
            this.params.context.componentParent.suppressConfirmationDialog = true;
          }

          this.params.node.setDataValue(this.params.colDef.field!, newDateTime);
          this.params.api!.stopEditing();
        } else {
          this.params.api!.stopEditing(true);
        }
      });
    });
  }

  getValue(): any {
    return this.value;
  }

  isPopup(): boolean {
    return true;
  }

  // Stub methods for interface completeness
  refresh?(params: ICellEditorParams<any, any, any>): void {}
  afterGuiAttached?(): void {}
  getPopupPosition?(): 'over' | 'under' | undefined { return 'over'; }
  isCancelBeforeStart?(): boolean { return false; }
  isCancelAfterEnd?(): boolean { return false; }
  focusIn?(): void {}
  focusOut?(): void {}
  getGui(): HTMLElement { return document.createElement('div'); }
  destroy?(): void {}
  init?(params: ICellEditorParams<any, any, any>): AgPromise<void> | void {}
}

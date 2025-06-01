import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEditDialogComponent } from './confirm-edit-dialog.component';

describe('ConfirmEditDialogComponent', () => {
  let component: ConfirmEditDialogComponent;
  let fixture: ComponentFixture<ConfirmEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

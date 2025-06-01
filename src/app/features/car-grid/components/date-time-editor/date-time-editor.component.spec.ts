import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeEditorComponent } from './date-time-editor.component';

describe('DateTimeEditorComponent', () => {
  let component: DateTimeEditorComponent;
  let fixture: ComponentFixture<DateTimeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimeEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateTimeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

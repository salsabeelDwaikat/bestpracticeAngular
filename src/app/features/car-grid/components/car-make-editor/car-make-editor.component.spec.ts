import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarMakeEditorComponent } from './car-make-editor.component';

describe('CarMakeEditorComponent', () => {
  let component: CarMakeEditorComponent;
  let fixture: ComponentFixture<CarMakeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarMakeEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarMakeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

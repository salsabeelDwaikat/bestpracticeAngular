import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import {
  ColDef,
  GridReadyEvent,
  CellClickedEvent,
  CellValueChangedEvent,
} from 'ag-grid-community';
import 'ag-grid-enterprise';

import { MatSelectModule } from '@angular/material/select';
import { CarMakeEditorComponent } from '../components/car-make-editor/car-make-editor.component';
import { DateTimePickerEditorComponent } from '../components/date-time-editor/date-time-editor.component';
import { Car, CarService } from '../services/car.service';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-car-grid',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule,
    MatSelectModule,
    CarMakeEditorComponent,
    DateTimePickerEditorComponent,
  ],
  templateUrl: './car-grid.component.html',
  styleUrls: ['./car-grid.component.css'],
})
export class CarGridComponent implements OnInit {
  isBrowser: boolean = false;
  rowData: Car[] = [];
  loading: boolean = false;
  gridApi: any;

  columnDefs: ColDef[] = [
    {
      field: 'id',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      maxWidth: 80,
    },
    {
      headerName: 'Make',
      field: 'make',
      editable: true,
      cellEditor: CarMakeEditorComponent,
      cellEditorPopup: true,
    },
    { field: 'model', editable: true },
    { field: 'year', editable: true },
    {
      headerName: 'Selling Date',
      field: 'selling_date',
      editable: true,
      cellEditor: DateTimePickerEditorComponent,
      cellEditorPopup: true,
    },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params: any) => {
        return `<button class="delete-btn" data-id="${params.data.id}" title="Delete">🗑️</button>`;
      },
      maxWidth: 100,
      menuTabs: [],
      sortable: false,
      filter: false,
    },
  ];

  defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
    sortable: true,
    filter: true,
    editable: true,
  };

  constructor(
    private carService: CarService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.loadCars();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onCellClicked(event: CellClickedEvent) {
    if (
      event.colDef.field === 'actions' &&
      event.event instanceof Event &&
      event.event.target instanceof HTMLElement &&
      event.event.target.classList.contains('delete-btn')
    ) {
      const carId = event.data.id;
      this.onDeleteCar(carId);
    }
  }

  loadCars() {
    this.loading = true;
    this.carService.getCars().subscribe({
      next: (data: Car[]) => {
        this.rowData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Failed to load cars:', err);
        this.loading = false;
      },
    });
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    const updatedCar = event.data;
    if (updatedCar?.id) {
      this.carService.updateCar(updatedCar.id, updatedCar).subscribe({
        next: () => {
          console.log('✅ Car updated:', updatedCar);
        },
        error: (err) => {
          console.error('❌ Failed to update car:', err);
        },
      });
    }
  }

  onAddCar() {
    const newCar: Car = {
      make: 'Porsche',
      model: 'F1',
      year: 2024,
      selling_date: new Date().toISOString().split('T')[0],
    };

    this.carService.createCar(newCar).subscribe({
      next: () => this.loadCars(),
      error: (err) => {
        console.error('❌ Create car failed:', err);
        this.loadCars();
      },
    });
  }

  onDeleteCar(carId: number) {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(carId).subscribe({
        next: () => this.loadCars(),
        error: (err) => console.error('❌ Failed to delete car:', err),
      });
    }
  }

  onDeleteSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const deleteRequests = selectedNodes.map((node: any) => {
      const carId = node.data.id;
      return this.carService.deleteCar(carId);
    });

    forkJoin(deleteRequests).subscribe({
      next: () => this.loadCars(),
      error: (err) => console.error('❌ Failed to delete selected cars:', err),
    });
  }
}

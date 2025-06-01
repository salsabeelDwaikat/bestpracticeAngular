import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';

export interface Car {
  id?: number;
  make: string;
  model: string;
  year: number;
  selling_date: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  
  private getAuthHeaders(): HttpHeaders | null {
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('Not in browser: localStorage unavailable');
      return null;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token not found in localStorage!');
      return null;
    }

    return new HttpHeaders({
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    });
  }

  getCars(): Observable<Car[]> {
    const headers = this.getAuthHeaders();
    if (!headers) return of([]);
    return this.http.get<Car[]>(`${this.baseUrl}/api/cars/`, { headers });
  }

  createCar(car: Car): Observable<Car | null> {
    const headers = this.getAuthHeaders();
    if (!headers) return of(null);
    return this.http.post<Car>(`${this.baseUrl}/api/cars/`, car, { headers });
  }

  updateCar(id: number, car: Car): Observable<Car | null> {
    const headers = this.getAuthHeaders();
    if (!headers) return of(null);
    return this.http.put<Car>(`${this.baseUrl}/api/cars/${id}/`, car, {
      headers,
    });
  }

  deleteCar(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    if (!headers) return of();
    return this.http.delete<void>(`${this.baseUrl}/api/cars/${id}/`, {
      headers,
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ENVIRONMENT } from '../../environment/environment';
import { Car } from '../types/car';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private httpClient = inject(HttpClient);
  private env = inject(ENVIRONMENT);
  baseUrl = `${this.env.apiUrl}/garage`;

  carsSignal = signal<Car[]>([]);

  getCars() {
    this.httpClient.get<Car[]>(`${this.baseUrl}`).subscribe((resp) => {
      this.carsSignal.set(resp);
      console.log(resp);
    });
  }

  getCarById(id: number): Observable<Car> {
    return this.httpClient.get<Car>(`${this.baseUrl}/${id}`);
  }

  updateCar(id: number | null, name?: string, color?: string) {
    return this.httpClient.put(`${this.baseUrl}/${id}`, {
      name,
      color,
    });
  }

  createCar(name: string, color: string): Observable<Car> {
    return this.httpClient.post<Car>(
      `${this.baseUrl}`,
      { name, color },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  deleteCar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
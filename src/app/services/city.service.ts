import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../models/city/city';
import { CreateCity } from '../models/city/create-city';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private url = environment.url + '/api/city';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getCities(): Observable<City[]> {
    const url = `${this.url}`;
    return this.http
      .get<City[]>(url)
      .pipe(catchError(this.errorHandler.handleError<City[]>('getCities')));
  }

  createCity(city: CreateCity): Observable<City> {
    return this.http
      .post<City>(`${this.url}`, city, this.httpOptions)
      .pipe(catchError(this.errorHandler.handleError<City>('createCity')));
  }

  deleteCity(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http
      .delete<void>(url)
      .pipe(catchError(this.errorHandler.handleError<void>('deleteCity')));
  }
}

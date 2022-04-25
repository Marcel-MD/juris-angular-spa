import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from 'src/environments/environment';
import { AppointmentRequest } from '../models/appointment-request/appointment-request';
import { CreateAppointmentRequest } from '../models/appointment-request/create-appointment-request';
import { AppointmentStatusEnum } from '../models/enums/appointment-status.enum';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private url = environment.url + '/api/appointment';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAppointments(userId: number): Observable<AppointmentRequest[]> {
    const url = `${this.url}/${userId}`;
    return this.http
      .get<AppointmentRequest[]>(url)
      .pipe(
        catchError(
          this.errorHandler.handleError<AppointmentRequest[]>('getAppointments')
        )
      );
  }

  createAppointment(
    userId: number,
    appointment: CreateAppointmentRequest
  ): Observable<AppointmentRequest> {
    return this.http
      .post<AppointmentRequest>(
        `${this.url}/${userId}`,
        appointment,
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandler.handleError<AppointmentRequest>('createAppointment')
        )
      );
  }

  setAppointmentStatus(
    id: number,
    status: AppointmentStatusEnum
  ): Observable<void> {
    const url = `${this.url}/${id}/status/${status}`;
    return this.http
      .patch<void>(url, {})
      .pipe(
        catchError(this.errorHandler.handleError<void>('setAppointmentStatus'))
      );
  }

  deleteAppointment(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http
      .delete<void>(url)
      .pipe(
        catchError(this.errorHandler.handleError<void>('deleteAppointment'))
      );
  }
}

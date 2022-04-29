import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { catchError, Observable } from 'rxjs';
import { Education } from '../models/education/education';
import { CreateEducation } from '../models/education/create-education';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private url = environment.url + '/api/education';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getEducations(profileId: number): Observable<Education[]> {
    const url = `${this.url}/${profileId}`;
    return this.http
      .get<Education[]>(url)
      .pipe(catchError(this.errorHandler.handleError<Education[]>()));
  }

  createEducation(
    profileId: number,
    education: CreateEducation
  ): Observable<Education> {
    return this.http
      .post<Education>(`${this.url}/${profileId}`, education, this.httpOptions)
      .pipe(catchError(this.errorHandler.handleError<Education>()));
  }

  deleteEducation(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http
      .delete<void>(url)
      .pipe(catchError(this.errorHandler.handleError<void>()));
  }
}

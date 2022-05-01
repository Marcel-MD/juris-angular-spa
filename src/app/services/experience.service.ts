import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { catchError, Observable } from 'rxjs';
import { Experience } from '../models/experience/experience';
import { CreateExperience } from '../models/experience/create-experience';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private url = environment.url + '/api/experience';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getExperiences(profileId: number): Observable<Experience[]> {
    const url = `${this.url}/${profileId}`;
    return this.http
      .get<Experience[]>(url)
      .pipe(catchError(this.errorHandler.handleError<Experience[]>()));
  }

  createExperience(
    profileId: number,
    experience: CreateExperience
  ): Observable<Experience> {
    if (!experience.endDate) {
      delete experience.endDate;
    }
    return this.http
      .post<Experience>(
        `${this.url}/${profileId}`,
        experience,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler.handleError<Experience>()));
  }

  deleteExperience(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http
      .delete<void>(url)
      .pipe(catchError(this.errorHandler.handleError<void>()));
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateProfileCategory } from '../models/profile-category/create-profile-category';
import { ProfileCategory } from '../models/profile-category/profile-category';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileCategoryService {
  private url = environment.url + '/api/category';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getProfileCategories(): Observable<ProfileCategory[]> {
    const url = `${this.url}`;
    return this.http
      .get<ProfileCategory[]>(url)
      .pipe(
        catchError(
          this.errorHandler.handleError<ProfileCategory[]>(
            'getProfileCategories'
          )
        )
      );
  }

  createProfileCategory(
    profileCategory: CreateProfileCategory
  ): Observable<ProfileCategory> {
    return this.http
      .post<ProfileCategory>(`${this.url}`, profileCategory, this.httpOptions)
      .pipe(
        catchError(
          this.errorHandler.handleError<ProfileCategory>(
            'createProfileCategory'
          )
        )
      );
  }

  deleteProfileCategory(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http
      .delete<void>(url)
      .pipe(
        catchError(this.errorHandler.handleError<void>('deleteProfileCategory'))
      );
  }
}

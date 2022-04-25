import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfileStatusEnum } from '../models/enums/profile-status.enum';
import { ListProfile } from '../models/profile/list-profile';
import { Profile } from '../models/profile/profile';
import { ProfileQueryParams } from '../models/profile/profile-query-params';
import { UpdateProfile } from '../models/profile/update-profile';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private url = environment.url + '/api/profile';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getProfiles(params: ProfileQueryParams): Observable<ListProfile[]> {
    let httpParams = new HttpParams().set('PageSize', 5);

    if (params.pageNumber) {
      httpParams = httpParams.set('PageNumber', params.pageNumber);
    } else {
      httpParams = httpParams.set('PageNumber', 1);
    }

    if (params.status) {
      httpParams = httpParams.set('Status', params.status);
    }

    if (params.categoryId) {
      httpParams = httpParams.set('CategoryId', params.categoryId);
    }

    if (params.cityId) {
      httpParams = httpParams.set('CityId', params.cityId);
    }

    if (params.sortBy) {
      httpParams = httpParams.set('SortBy', params.sortBy);
    }

    const options = {
      params: httpParams,
    };

    return this.http
      .get<ListProfile[]>(this.url, options)
      .pipe(
        catchError(this.errorHandler.handleError<ListProfile[]>('getProfiles'))
      );
  }

  getProfileById(id: number): Observable<Profile> {
    const url = `${this.url}/${id}`;
    return this.http
      .get<Profile>(url)
      .pipe(catchError(this.errorHandler.handleError<Profile>('getProfile')));
  }

  createProfile(profile: UpdateProfile): Observable<Profile> {
    return this.http
      .post<Profile>(`${this.url}`, profile, this.httpOptions)
      .pipe(
        catchError(this.errorHandler.handleError<Profile>('createProfile'))
      );
  }

  createEmptyProfile(): Observable<Profile> {
    return this.http
      .post<Profile>(`${this.url}/empty`, {}, this.httpOptions)
      .pipe(
        catchError(this.errorHandler.handleError<Profile>('createEmptyProfile'))
      );
  }

  updateProfile(id: number, profile: UpdateProfile): Observable<Profile> {
    return this.http
      .put<Profile>(`${this.url}/${id}`, profile, this.httpOptions)
      .pipe(
        catchError(this.errorHandler.handleError<Profile>('updateProfile'))
      );
  }

  setProfileStatus(id: number, status: ProfileStatusEnum): Observable<void> {
    const url = `${this.url}/${id}/status/${status}`;
    return this.http
      .patch<void>(url, {})
      .pipe(
        catchError(this.errorHandler.handleError<void>('setProfileStatus'))
      );
  }

  setProfileImage(id: number, file: File): Observable<void> {
    const url = `${this.url}/${id}/image`;
    const options = {
      headers: new HttpHeaders({
        'Content-Disposition': 'multipart/form-data',
      }),
    };
    const formData = new FormData();
    formData.append('image', file, file.name);

    return this.http
      .patch<void>(url, formData, options)
      .pipe(catchError(this.errorHandler.handleError<void>('setProfileImage')));
  }

  getProfileImageUrl(imageName: string): string {
    return environment.url + `/api/blob/${imageName}`;
  }

  deleteProfile(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http
      .delete<void>(url, this.httpOptions)
      .pipe(catchError(this.errorHandler.handleError<void>('deleteProfile')));
  }
}

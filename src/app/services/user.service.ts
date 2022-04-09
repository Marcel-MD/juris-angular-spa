import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user/user';
import { CreateUser } from '../models/user/create-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  private url = environment.url + '/api/user';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  loginUser(createUser: CreateUser): Observable<User> {
    const url = `${this.url}/login`;
    return this.http
      .post<User>(url, createUser, this.httpOptions)
      .pipe(catchError(this.errorHandler.handleError<User>('loginUser')));
  }

  registerUser(createUser: CreateUser): Observable<void> {
    const url = `${this.url}/register`;
    return this.http
      .post<void>(url, createUser, this.httpOptions)
      .pipe(catchError(this.errorHandler.handleError<void>('registerUser')));
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }
}

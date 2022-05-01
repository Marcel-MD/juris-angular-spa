import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user/user';
import { CreateUser } from '../models/user/create-user';
import { RoleTypeEnum } from '../models/enums/role-type.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.url + '/api/user';
  private user?: User = undefined;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {
    this.user = this.getLocalUser();
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  loginUser(createUser: CreateUser): Observable<User> {
    const url = `${this.url}/login`;
    return this.http
      .post<User>(url, createUser, this.httpOptions)
      .pipe(catchError(this.errorHandler.handleError<User>()))
      .pipe(
        map((user) => {
          this.saveUser(user);
          return user;
        })
      );
  }

  registerUser(createUser: CreateUser): Observable<User> {
    const url = `${this.url}/register`;
    return this.http
      .post<User>(url, createUser, this.httpOptions)
      .pipe(catchError(this.errorHandler.handleError<User>()));
  }

  logoutUser(): void {
    localStorage.removeItem('user');
    this.user = undefined;
  }

  getUser(): User | undefined {
    return this.user;
  }

  getUserId(): number {
    return this.user ? this.user.id : 0;
  }

  getProfileId(): number {
    if (!this.user) return 0;
    if (!this.user.profileId) return 0;
    return this.user.profileId;
  }

  updateProfileId(id: number) {
    if (!this.user) return;
    this.user.profileId = id;
    this.saveUser(this.user);
  }

  getToken(): string {
    if (this.user) {
      if (this.user.token) return this.user.token;
    }
    return '';
  }

  isAuthenticated(): boolean {
    return this.user ? true : false;
  }

  isAdmin(): boolean {
    if (!this.user) return false;
    return this.user.roles.includes(RoleTypeEnum.Admin);
  }

  private saveUser(user?: User) {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  private getLocalUser(): User | undefined {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr) as User;
    return undefined;
  }
}

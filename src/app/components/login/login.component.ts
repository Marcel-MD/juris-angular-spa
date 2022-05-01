import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUser } from 'src/app/models/user/create-user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  loginUser(): void {
    if (!this.email.valid || !this.password.valid) return;

    this.userService
      .loginUser({
        email: this.email.value,
        password: this.password.value,
      } as CreateUser)
      .subscribe((user) => {
        if (!user) return;
        window.location.href = '/';
      });
  }

  getErrorMessage(field: string) {
    switch (field) {
      case 'email':
        if (this.email.hasError('required')) {
          return 'You must enter a value';
        }
        return this.email.hasError('email') ? 'Not a valid email' : '';

      case 'password':
        if (this.password.hasError('required')) {
          return 'You must enter a value';
        }
        return this.password.hasError('minlength')
          ? 'Minimum length is 8 chars'
          : '';

      default:
        return 'You must enter a value';
    }
  }
}

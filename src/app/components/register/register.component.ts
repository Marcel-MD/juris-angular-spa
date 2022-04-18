import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CreateUser } from 'src/app/models/user/create-user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  password2 = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  registerUser(): void {
    if (!this.email.valid || !this.password.valid || !this.password2.valid)
      return;

    if (this.password.value != this.password2.value) {
      this.messageService.add("Passwords don't match");
      return;
    }

    this.userService
      .registerUser({
        email: this.email.value,
        password: this.password.value,
      } as CreateUser)
      .subscribe((user) => {
        if (user == null) return;
        window.location.href = '/login';
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

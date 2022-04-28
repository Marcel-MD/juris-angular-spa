import { Component, Input, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateAppointmentRequest } from 'src/app/models/appointment-request/create-appointment-request';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent implements OnInit {
  @Input() userId!: number;

  formState: 'active' | 'loading' | 'success' = 'active';

  appointment = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(500),
    ]),
  });

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {}

  createAppointment() {
    this.formState = 'loading';
    this.appointmentService
      .createAppointment(
        this.userId,
        this.appointment.value as CreateAppointmentRequest
      )
      .subscribe((appointment) => {
        if (appointment) {
          this.formState = 'success';
        } else {
          this.formState = 'active';
        }
      });
  }

  getErrorMessage(field: string): string {
    let fc = this.appointment.get(field);
    if (!fc) return 'Invalid field';

    if (fc.hasError('required')) {
      return 'You must enter a value';
    }

    if (fc.hasError('minlength')) {
      return 'Length too small';
    }

    if (fc.hasError('maxlength')) {
      return 'Length too big';
    }

    if (fc.hasError('email')) {
      return 'Not a valid email';
    }

    return 'Invalid field';
  }
}

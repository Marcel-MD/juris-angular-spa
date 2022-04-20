import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentRequest } from 'src/app/models/appointment-request/appointment-request';
import { AppointmentStatusEnum } from 'src/app/models/enums/appointment-status.enum';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  @Output() onDelete: EventEmitter<boolean> = new EventEmitter();
  @Input() appointment!: AppointmentRequest;
  statusEnum = AppointmentStatusEnum;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {}

  setAppointmentStatus(status: AppointmentStatusEnum) {
    this.appointmentService
      .setAppointmentStatus(this.appointment.id, status)
      .subscribe();
    this.appointment.status = status;
  }

  deleteAppointment() {
    this.appointmentService.deleteAppointment(this.appointment.id).subscribe();
    this.onDelete.emit(true);
  }
}

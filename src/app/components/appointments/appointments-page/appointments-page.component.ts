import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentRequest } from 'src/app/models/appointment-request/appointment-request';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointments-page',
  templateUrl: './appointments-page.component.html',
  styleUrls: ['./appointments-page.component.css'],
})
export class AppointmentsPageComponent implements OnInit {
  appointments: AppointmentRequest[] = [];

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    let userId = Number(this.route.snapshot.paramMap.get('id'));

    this.appointmentService
      .getAppointments(userId)
      .subscribe((appointments) => {
        this.appointments = appointments;
      });
  }

  deleteAppointment(id: number) {
    this.appointments = this.appointments.filter((a) => a.id != id);
  }
}

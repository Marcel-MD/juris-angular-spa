export interface AppointmentRequest {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  description: string;
  status: string;
  creationDate: Date;
}

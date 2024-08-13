import { ObjectId } from "mongoose";

export class AppointmentDto {
  id: string;
  patient_id: ObjectId | string;
  doctor: string;
  appointment_date: string;
  reason: string;
}

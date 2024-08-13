import { ObjectId } from "mongoose";

export class PrescriptionDto {
  id: string;
  patient_id: ObjectId | string;
  medication: string;
  dosage: string;
  prescribed_date: string;
}

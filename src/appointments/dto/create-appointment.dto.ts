import { IsDateString, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsMongoId()
  patient_id: number;

  @IsString()
  @IsNotEmpty()
  doctor: string;

  @IsDateString()
  appointment_date: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}

import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePrescriptionDto {
  @IsNumber()
  @IsNotEmpty()
  patient_id: number;

  @IsString()
  @IsNotEmpty()
  medication: string;

  @IsString()
  @IsNotEmpty()
  dosage: string;
}

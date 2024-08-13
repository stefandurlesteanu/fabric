import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreatePrescriptionDto {
  @IsString()
  @IsMongoId()
  patient_id: string;

  @IsString()
  @IsNotEmpty()
  medication: string;

  @IsString()
  @IsNotEmpty()
  dosage: string;
}

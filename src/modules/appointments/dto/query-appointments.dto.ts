import { IsOptional, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAppointmentsQueryDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  patient_id?: number;

  @IsOptional()
  @IsString()
  doctor?: string;
}

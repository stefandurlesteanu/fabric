import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class FindPrescriptionsQueryDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  patient_id?: number;

  @IsOptional()
  @IsString()
  medication?: string;
}

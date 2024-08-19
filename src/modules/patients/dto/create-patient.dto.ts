import { IsEnum, IsIn, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { Gender } from '../enums/gender.enum';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @IsString()
  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  contact: string;
}

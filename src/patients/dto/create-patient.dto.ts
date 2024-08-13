import { IsInt, IsString, IsNotEmpty, Min, Max, IsIn } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @IsString()
  @IsNotEmpty()
  contact: string;
}

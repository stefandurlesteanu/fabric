import { IsEmail, IsEnum, IsOptional, IsStrongPassword } from 'class-validator';
import { User, UserRole } from '../schemas/user.schema';


export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsStrongPassword()
  @IsOptional()
  password?: string;

  @IsEnum(UserRole, { each: true })
  roles?: UserRole[];
}

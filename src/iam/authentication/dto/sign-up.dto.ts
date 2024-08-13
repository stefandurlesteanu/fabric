import { IsEmail, IsEnum, IsString, IsStrongPassword } from "class-validator";
import { UserRole } from "src/users/entities/user.entity";

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(UserRole)
  role: string;
}

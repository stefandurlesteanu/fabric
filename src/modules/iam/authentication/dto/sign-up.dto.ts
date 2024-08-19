import { IsEmail, IsEnum, IsStrongPassword } from "class-validator";
import { UserRole } from "../../../users/schemas/user.schema";


export class SignUpDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(UserRole)
  role: string;
}

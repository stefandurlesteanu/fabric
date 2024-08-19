import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthType } from './enums/auth-type.enum';
import { CreateUserDto, UserCredentialsDto } from '../../users/dto';
import { Auth } from './decorators/auth.decorator';

@Auth(AuthType.NONE)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly _authService: AuthenticationService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: CreateUserDto) {
    const user = await this._authService.signUp(signUpDto);

    return {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: UserCredentialsDto) {
    return this._authService.signIn(signInDto);
  }
}

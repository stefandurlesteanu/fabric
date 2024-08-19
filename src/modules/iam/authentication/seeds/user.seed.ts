import { Injectable } from '@nestjs/common';
import { UserRole } from '../../../../common/enums/user-role.enum';
import { CreateUserDto } from '../../../users/dto';
import { UsersService } from '../../../users/users.service';
import { AuthenticationService } from '../authentication.service';


@Injectable()
export class SeedService {
  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _userService: UsersService,
  ) {}

  async seedInitialUser(role: UserRole, email) {
    const userExists = await this._userService.findOne({ email });
    if (!userExists) {
      const initialUser: CreateUserDto = {
        email,
        password: 'adminpassword',
      };
      const user = await this._authService.signUp(initialUser);
      await this._userService.update(user.id, { roles: [role] });
      console.log(`Initial ${role.toString()} user created`);
    } else {
      console.log(`Initial ${role.toString()} user already exists`);
    }
  }
}

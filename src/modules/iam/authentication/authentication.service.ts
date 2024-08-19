
import { ConflictException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/schemas/user.schema';
import jwtConfig from '../config/jwt.config';
import { HashingService } from '../hashing/hashing.service';
import { ActiveUserData } from './interfaces/active-user-data.interface';
import { UsersService } from '../../users/users.service';
import { CreateUserDto, UserCredentialsDto } from '../../users/dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _hashingService: HashingService,
    private readonly _jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly _jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await this._hashingService.hash(signUpDto.password);
      const userToCreate = {
        ...signUpDto,
        password: hashedPassword,
      };

      return await this._usersService.createUser(userToCreate);
    } catch (e) {
      if (e instanceof ConflictException) {
        throw e;
      }
      throw new InternalServerErrorException('Error occurred during sign up', e.message);
    }
  }

  async signIn(signInDto: UserCredentialsDto): Promise<{ accessToken: string }> {
    const user = await this._usersService.findOneByIdOrEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const isPasswordValid = await this._hashingService.compare(signInDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password does not match');
    }

    const accessToken = await this._jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        roles: user.roles,
      } as ActiveUserData,
      {
        secret: this._jwtConfiguration.secret,
        expiresIn: this._jwtConfiguration.accessTokenTtl,
      },
    );

    return { accessToken };
  }
}

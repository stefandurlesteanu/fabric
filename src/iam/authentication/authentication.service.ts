import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActiveUserData } from 'src/iam/authentication/interfaces/active-user-data.interface';
import { User } from '../../users/entities/user.entity';
import jwtConfig from '../config/jwt.config';
import { HashingService } from '../hashing/hashing.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration:ConfigType<typeof jwtConfig>
  ) {}

  async singUp(signUpDto: SignUpDto) {
    try {
      const user = new this.userModel(signUpDto);
      user.password = await this.hashingService.hash(signUpDto.password);
      return user.save();
    } catch (e) {
      console.log(e);
    }
  }

  async signIn(signInDto: SignInDto) {
    const tt = await this.userModel
      .find()
      .exec();
    const user = await this.userModel.findOne({ email: signInDto.email }).exec();
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        role: user.role
      } as ActiveUserData,
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
    return {
      accessToken,
    };
  }
}

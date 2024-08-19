import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/base/base.repository';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel(User.name) private readonly _userModel: Model<UserDocument>) {
    super(_userModel);
  }
}

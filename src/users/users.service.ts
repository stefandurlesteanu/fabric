import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ){}



  async findOne(id: number) {
    const user = await this.userModel.findOne({_id: id}).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async delete({email}) {
    await this.userModel.deleteOne({email})
  }

}

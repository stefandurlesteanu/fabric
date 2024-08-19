import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Types, UpdateQuery } from 'mongoose';
import { BaseService } from '../../common/base/base.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService extends BaseService<UserDocument> {
  constructor(private readonly _usersRepository: UsersRepository) {
    super(_usersRepository);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    const user = await this._usersRepository.findOne({ email });
    if (user) {
      throw new ConflictException('Email already exists');
    }

    return this._usersRepository.create(createUserDto);
  }

  async findOneByIdOrEmail(idOrEmail: string): Promise<User | null> {
    const query = Types.ObjectId.isValid(idOrEmail)
      ? { $or: [{ email: idOrEmail }, { _id: idOrEmail }] }
      : { email: idOrEmail };

    try {
      return this._usersRepository.findOne(query);
    } catch (error) {
      throw new Error('Could not fetch the user');
    }
  }

  async update(id: string, updateData: UpdateQuery<User>): Promise<UserDocument | null> {
    const result = await this.repository.update({ id }, updateData, { password: 0 });
    if (!result) {
      throw new NotFoundException(`Document with id ${id} not found`);
    }
    return result;
  }
}

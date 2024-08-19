import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Post()
  async create(@Body() createDto: CreateUserDto): Promise<User> {
    return this._usersService.create(createDto);
  }

  @Get(':id')
  async findOneByIdOrEmail(@Param('idOrEmail') idOrEmail: string): Promise<User> {
    return this._usersService.findOneByIdOrEmail(idOrEmail);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this._usersService.find();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateUserDto): Promise<User | null> {
    const user = await this._usersService.update(id, updateDto);
    if (!user) {
      throw new NotFoundException(`Document with id ${id} not found`);
    }

    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const user = await this._usersService.delete(id);
    if (!user) {
      throw new NotFoundException(`Document with id ${id} not found`);
    }
  }
}

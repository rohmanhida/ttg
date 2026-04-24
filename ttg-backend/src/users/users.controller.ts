import { Controller, Get, Post, Delete, Body, Query } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './../database/user.model';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.get();
  }

  @Get('single/')
  async getByID(@Query('id') id: number): Promise<User> {
    return this.userService.getOneByPK(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Delete()
  async delete(@Query('id') id: number): Promise<any> {
    return this.userService.remove(id);
  }
}

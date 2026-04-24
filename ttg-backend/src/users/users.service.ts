import {
  Injectable,
  Body,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './../database/user.model';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const [user, created] = await this.userModel.findOrCreate({
      where: { email: createUserDto.email },
      defaults: {
        fullName: createUserDto.fullName,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });
    if (!created) {
      throw new BadRequestException('email already registered');
    }
    return user;
  }

  async get(): Promise<User[]> {
    const users = await this.userModel.findAll();
    return users;
  }

  async getOneByPK(pk: number): Promise<User> {
    const user = await this.userModel.findByPk(pk);
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async getOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: { email: email },
    });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async remove(pk: number): Promise<any> {
    const count = await this.userModel.destroy({ where: { id: pk } });
    if (count != 1) throw new NotFoundException('user not found');
    return { message: 'ok' };
  }
}

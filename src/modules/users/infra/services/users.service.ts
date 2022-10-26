import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CreateUserDTO } from '../../domain/dto/create-user.dto';
import { IUser, IUserKey } from '../../domain/interfaces/user.interface';

import { v4 as uuid } from 'uuid';
import { UpdateUserDTO } from '../../domain/dto/update-user.dto';
import User from '../../domain/entities/user.entity';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    @InjectModel('users')
    private userModel: Model<IUser, IUserKey>,
  ) {}

  async create(data: CreateUserDTO) {
    this.logger.log('Creating user.');
    return (await this.userModel.create({ id: uuid(), ...data })).toJSON();
  }

  async update(key: IUserKey, user: UpdateUserDTO) {
    return (await this.userModel.update(key, user)).toJSON();
  }

  async findOne(key: IUserKey) {
    const user = (await this.userModel.get(key)).toJSON();
    return new User(user);
  }

  async findAll() {
    const users = await this.userModel.scan().exec();
    return users.map((user) => user.toJSON());
  }

  async delete(key: IUserKey) {
    return this.userModel.delete(key);
  }
}

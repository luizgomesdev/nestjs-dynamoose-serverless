import { Todo } from './../../../todos/domain/entities/todo.entity';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { TodosService } from '../../../todos/infra/services/todos.service';
import { CreateUserDTO } from '../../domain/dto/create-user.dto';
import { UpdateUserDTO } from '../../domain/dto/update-user.dto';
import User from '../../domain/entities/user.entity';
import { UsersService } from '../services/users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly todosService: TodosService,
  ) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    try {
      this.logger.log('New user creation');
      const user = await this.usersService.create(data);
      return new User(user);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new User(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne({ id });
    const todos = await this.todosService.findAllByUser(user.id);

    return new User({ ...user, todos: todos.map((todo) => new Todo(todo)) });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    const user = await this.usersService.update({ id }, data);
    return new User(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete({ id });
  }
}

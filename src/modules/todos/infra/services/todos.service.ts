import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CreateTodoDTO } from '../../domain/dto/create-todo.dto';
import { ITodo, ITodoKey } from './../../domain/interfaces/todo.interface';

import { v4 as uuid } from 'uuid';
import { UpdateTodoDTO } from '../../domain/dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel('Todo')
    private todoModel: Model<ITodo, ITodoKey>,
  ) {}

  async create(data: CreateTodoDTO) {
    return (await this.todoModel.create({ id: uuid(), ...data })).toJSON();
  }

  async update(key: ITodoKey, user: Partial<UpdateTodoDTO>) {
    return (await this.todoModel.update(key, user)).toJSON();
  }

  async findOne(key: ITodoKey) {
    return (await this.todoModel.get(key)).toJSON();
  }

  async findAll() {
    const todos = await this.todoModel.scan().exec();
    return todos.map((user) => user.toJSON());
  }

  async findAllByUser(userId: string) {
    const todos = await this.todoModel.scan('userId').eq(userId).exec();
    return todos.map((user) => user.toJSON());
  }

  async delete(key: ITodoKey) {
    return this.todoModel.delete(key);
  }
}

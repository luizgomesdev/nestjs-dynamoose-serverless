import { Exclude, Type } from 'class-transformer';
import { Todo } from './../../../todos/domain/entities/todo.entity';
import { IUser } from '../interfaces/user.interface';

export default class User implements IUser {
  @Exclude()
  id: string;

  name: string;

  email: string;

  @Type(() => Todo)
  todos?: Todo[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

import { Todo } from './../../../todos/domain/entities/todo.entity';

export interface IUserKey {
  id: string;
}

export interface IUser extends IUserKey {
  id: string;

  name: string;

  email: string;

  todos?: Todo[];
}

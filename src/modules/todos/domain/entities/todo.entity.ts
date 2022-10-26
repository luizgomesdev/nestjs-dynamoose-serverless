import { ITodo } from './../interfaces/todo.interface';
import { Exclude } from 'class-transformer';

export class Todo implements ITodo {
  @Exclude()
  id: string;

  name: string;

  @Exclude()
  userId: string;

  constructor(partial: Partial<Todo>) {
    Object.assign(this, partial);
  }
}

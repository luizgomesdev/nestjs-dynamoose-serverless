import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTodoDTO } from '../../domain/dto/create-todo.dto';
import { UpdateTodoDTO } from '../../domain/dto/update-todo.dto';
import { TodosService } from '../services/todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() data: CreateTodoDTO) {
    return this.todosService.create(data);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDTO) {
    return this.todosService.update({ id }, updateTodoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todosService.delete({ id });
  }
}

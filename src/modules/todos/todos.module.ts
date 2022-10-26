import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { TodoSchema } from './domain/schema/todo.schema';
import { TodosController } from './infra/controllers/todos.controller';
import { TodosService } from './infra/services/todos.service';

@Module({
  imports: [DynamooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TodosService],
})
export class TodosModule {}

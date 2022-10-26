import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UsersController } from './infra/controllers/users.controller';

import { TodosModule } from '../todos/todos.module';
import { UserSchema } from './domain/schema/user.schema';
import { UsersService } from './infra/services/users.service';

@Module({
  imports: [
    TodosModule,
    DynamooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

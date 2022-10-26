import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './modules/todos/todos.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    DynamooseModule.forRoot({
      local: process.env.IS_OFFLINE === 'true',
      aws: {
        region: 'us-east-1',
      },
    }),
    UsersModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

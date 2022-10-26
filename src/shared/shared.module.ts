import { Module } from '@nestjs/common';
import { DynamooseService } from './service/dynamoose/dynamoose.service';

@Module({ providers: [DynamooseService], exports: [DynamooseService] })
export class SharedModule {}

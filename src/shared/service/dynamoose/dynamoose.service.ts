import { Injectable } from '@nestjs/common';
import * as dynamoose from 'dynamoose';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

@Injectable()
export class DynamooseService {
  private readonly isLocal = process.env.IS_OFFLINE;

  constructor() {
    dynamoose.aws.ddb.set(
      new DynamoDB({
        ...(this.isLocal
          ? {
              endpoint: 'http://localhost:8000',
            }
          : {}),

        region: process.env.REGION || 'us-east-1',
      }),
    );

    const defaullDynamoose = dynamoose.Table.defaults.get();
    dynamoose.Instance.default.Table.defaults.set({
      ...defaullDynamoose,
      create: false,
    });
  }

  get dynamoose() {
    return dynamoose;
  }
}

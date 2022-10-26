import { Test, TestingModule } from '@nestjs/testing';
import { DynamooseService } from './dynamoose.service';

describe('DynamooseService', () => {
  let service: DynamooseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamooseService],
    }).compile();

    service = module.get<DynamooseService>(DynamooseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

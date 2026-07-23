import { Test, TestingModule } from '@nestjs/testing';
import { PassengersResolver } from './passengers.resolver';
import { PassengersService } from './passengers.service';

describe('PassengersResolver', () => {
  let resolver: PassengersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassengersResolver, { provide: PassengersService, useValue: {} }],
    }).compile();

    resolver = module.get<PassengersResolver>(PassengersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

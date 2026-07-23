import { Test, TestingModule } from '@nestjs/testing';
import { FlightsResolver } from './flights.resolver';
import { FlightsService } from './flights.service';

describe('FlightsResolver', () => {
  let resolver: FlightsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightsResolver, { provide: FlightsService, useValue: {} }],
    }).compile();

    resolver = module.get<FlightsResolver>(FlightsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SeatsService } from './seats.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';

describe('SeatsService', () => {
  let service: SeatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeatsService, { provide: getRepositoryToken(Seat), useValue: {} }],
    }).compile();

    service = module.get<SeatsService>(SeatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

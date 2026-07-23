import { Test, TestingModule } from '@nestjs/testing';
import { PassengersService } from './passengers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Passenger } from './entities/passenger.entity';

describe('PassengersService', () => {
  let service: PassengersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassengersService, { provide: getRepositoryToken(Passenger), useValue: {} }],
    }).compile();

    service = module.get<PassengersService>(PassengersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

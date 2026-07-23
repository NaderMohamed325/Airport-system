import { Test, TestingModule } from '@nestjs/testing';
import { FlightsService } from './flights.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { SeatsService } from 'src/seats/seats.service';
import { PlanesService } from 'src/planes/planes.service';

describe('FlightsService', () => {
  let service: FlightsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlightsService,
        { provide: getRepositoryToken(Flight), useValue: {} },
        { provide: SeatsService, useValue: {} },
        { provide: PlanesService, useValue: {} },
      ],
    }).compile();

    service = module.get<FlightsService>(FlightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

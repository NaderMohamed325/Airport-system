import { Test, TestingModule } from '@nestjs/testing';
import { PlanesService } from './planes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Plane } from './entities/plane.entity';

describe('PlanesService', () => {
  let service: PlanesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanesService, { provide: getRepositoryToken(Plane), useValue: {} }],
    }).compile();

    service = module.get<PlanesService>(PlanesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

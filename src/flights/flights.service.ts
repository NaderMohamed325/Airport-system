import { Injectable } from '@nestjs/common';
import { CreateFlightInput } from './dto/create-flight.input';
import { UpdateFlightInput } from './dto/update-flight.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from 'src/flights/entities/flight.entity';
import { Plane } from 'src/planes/entities/plane.entity';
import { Repository } from 'typeorm';
import { PaginationInput } from 'src/utils/pagination.dto';
import { FlightFilterInput } from './dto/gql/flight.filter.dto';
import { FlightSortInput } from './dto/gql/flight.sort.dto';
import { SeatsService } from 'src/seats/seats.service';
import { PlanesService } from 'src/planes/planes.service';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight) private readonly flightRepository: Repository<Flight>,
    private readonly seatsService: SeatsService,
    private readonly planeService: PlanesService,
  ) {}

  async create(createFlightInput: CreateFlightInput) {

    const plane = await this.planeService.findOne(createFlightInput.planeId);
    if (!plane) {
      throw new Error(`Plane with ID ${createFlightInput.planeId} not found`);
    }
    createFlightInput.availableSeats = Math.min(plane.capacity, createFlightInput.availableSeats);
    const flight = this.flightRepository.create({
      ...createFlightInput,
      plane: { id: createFlightInput.planeId } as Plane,
    });
    const saved = await this.flightRepository.save(flight);
    console.log(saved.availableSeats)
    await this.seatsService.createSeatsForPlane(saved.availableSeats, createFlightInput.planeId);
    return saved;
  }

  async findAll(pagination: PaginationInput, filter?: FlightFilterInput, sort?: FlightSortInput) {
    const query = this.flightRepository.createQueryBuilder('flight');

    if (filter) {
      if (filter.departure) {
        query.andWhere('flight.departure = :departure', { departure: filter.departure });
      }
      if (filter.arrival) {
        query.andWhere('flight.arrival = :arrival', { arrival: filter.arrival });
      }
      if (filter.airline) {
        query.andWhere('flight.airline = :airline', { airline: filter.airline });
      }
      if (filter.status) {
        query.andWhere('flight.status = :status', { status: filter.status });
      }
    }

    query.orderBy(`flight.${sort?.sortBy ?? 'departureTime'}`, sort?.order ?? 'ASC');

    const [data, total] = await query
      .skip((pagination.page - 1) * pagination.limit)
      .take(pagination.limit)
      .getManyAndCount();

    return {
      data,
      total,
      page: pagination.page,
      totalPages: Math.ceil(total / pagination.limit),
    };
  }

  async findOne(id: number) {
    return await this.flightRepository.findOneBy({ id });
  }

  async update(id: number, updateFlightInput: UpdateFlightInput) {
    await this.flightRepository.update(id, updateFlightInput);
    return await this.flightRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.flightRepository.delete(id);
  }
}

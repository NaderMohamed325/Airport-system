import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from 'src/seats/entities/seat.entity';
import { Plane } from 'src/planes/entities/plane.entity';
import { PaginationInput } from 'src/utils/pagination.dto';
import { SeatFilterInput } from './dto/gql/seat.filter.input';
import { SeatSortInput } from './dto/gql/seat.sort.input';

@Injectable()
export class SeatsService {
  constructor(@InjectRepository(Seat) private readonly seatRepository: Repository<Seat>) {}

  async createSeatsForPlane(count: number, planeId: number): Promise<Seat[]> {
    const seats = Array.from({ length: count }, (_, i) =>
      this.seatRepository.create({
        seatNumber: `Seat-${i + 1}`,
        plane: { id: planeId } as Plane,
      }),
    );
    return await this.seatRepository.save(seats);
  }

  async findAll(pagination: PaginationInput, filter?: SeatFilterInput, sort?: SeatSortInput) {
    const query = this.seatRepository.createQueryBuilder('seat');

    if (filter) {
      if (filter.seatNumber) {
        query.andWhere('seat.seatNumber = :seatNumber', { seatNumber: filter.seatNumber });
      }
      if (filter.status) {
        query.andWhere('seat.status = :status', { status: filter.status });
      }
      if (filter.planeId) {
        query.andWhere('seat.planeId = :planeId', { planeId: filter.planeId });
      }
    }

    query.orderBy(`seat.${sort?.sortBy ?? 'seatNumber'}`, sort?.order ?? 'ASC');

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

  findOne(id: number) {
    return this.seatRepository.findOneBy({ id });
  }
}

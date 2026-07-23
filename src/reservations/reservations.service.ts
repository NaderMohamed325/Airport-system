import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { PaginationInput } from 'src/utils/pagination.dto';
import { ReservationFilterInput } from './dto/gql/reservation.filter.input';
import { ReservationSortInput } from './dto/gql/reservation.sort.input';
import { Seat } from 'src/seats/entities/seat.entity';
import { SeatStatusEnum } from 'src/seats/entities/seatStatus.enum';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createReservationInput: CreateReservationInput) {
    return await this.dataSource.transaction(async (manager) => {
      const seat = await manager
        .createQueryBuilder(Seat, 'seat')
        .setLock('pessimistic_write')
        .where('seat.id = :seatId', { seatId: createReservationInput.seatId })
        .getOne();

      if (!seat) {
        throw new NotFoundException(`Seat ${createReservationInput.seatId} not found`);
      }

      const now = new Date();
      const isHeldByOther = seat.status !== SeatStatusEnum.AVAILABLE && seat.lockedUntil && seat.lockedUntil > now;

      if (seat.status === SeatStatusEnum.RESERVED || isHeldByOther) {
        throw new ConflictException(`Seat ${createReservationInput.seatId} is not available`);
      }

      // seat.status === AVAILABLE, or it was LOCKED but the hold expired — safe to take
      const lockUntil = new Date(now.getTime() + 15 * 60 * 1000);
      seat.status = SeatStatusEnum.RESERVED;
      seat.lockedUntil = lockUntil;
      await manager.save(seat);

      const reservation = manager.create(Reservation, {
        seat: { id: createReservationInput.seatId },
        flight: { id: createReservationInput.flightId },
        passenger: { id: createReservationInput.passengerId },
      });

      return await manager.save(reservation);
    });
  }

  async findAll(pagination: PaginationInput, filter?: ReservationFilterInput, sort?: ReservationSortInput) {
    const query = this.reservationRepository.createQueryBuilder('reservation');

    if (filter) {
      if (filter.flightId) {
        query.andWhere('reservation.flightId = :flightId', { flightId: filter.flightId });
      }
      if (filter.passengerId) {
        query.andWhere('reservation.passengerId = :passengerId', { passengerId: filter.passengerId });
      }
      if (filter.seatId) {
        query.andWhere('reservation.seatId = :seatId', { seatId: filter.seatId });
      }
    }

    query.orderBy(`reservation.${sort?.sortBy ?? 'createdAt'}`, sort?.order ?? 'ASC');

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
    return await this.reservationRepository.findOneBy({ id });
  }

  async findOneByPassenger(id: number, passengerId: number) {
    return await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.id = :id', { id })
      .andWhere('reservation.passengerId = :passengerId', { passengerId })
      .getOne();
  }

  async update(id: number, updateReservationInput: UpdateReservationInput) {
    await this.reservationRepository.update(id, updateReservationInput);
    return await this.reservationRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.reservationRepository.delete(id);
  }
}

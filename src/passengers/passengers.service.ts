import { Injectable } from '@nestjs/common';
import { CreatePassengerInput } from './dto/create-passenger.input';
import { UpdatePassengerInput } from './dto/update-passenger.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from 'src/passengers/entities/passenger.entity';
import { PaginationInput } from 'src/utils/pagination.dto';
import { PassengerFilterInput } from './dto/gql/passenger.filter.input';
import { PassengerSortInput } from './dto/gql/passenger.sort.input';

@Injectable()
export class PassengersService {
  constructor(@InjectRepository(Passenger) private readonly passengerRepository: Repository<Passenger>) {}

  async create(createPassengerInput: CreatePassengerInput) {
    const passenger = this.passengerRepository.create(createPassengerInput);
    return await this.passengerRepository.save(passenger);
  }

  async findOneByEmail(email: string): Promise<Passenger | null> {
    return await this.passengerRepository.findOne({ where: { email } });
  }

  async findOneByEmailWithPassword(email: string): Promise<Passenger | null> {
    return await this.passengerRepository
      .createQueryBuilder('passenger')
      .addSelect('passenger.password')
      .where('passenger.email = :email', { email })
      .getOne();
  }

  async findAll(pagination: PaginationInput, filter?: PassengerFilterInput, sort?: PassengerSortInput) {
    const query = this.passengerRepository.createQueryBuilder('passenger');

    if (filter) {
      if (filter.name) {
        query.andWhere('passenger.name LIKE :name', { name: `%${filter.name}%` });
      }
      if (filter.email) {
        query.andWhere('passenger.email = :email', { email: filter.email });
      }
      if (filter.nationality) {
        query.andWhere('passenger.nationality LIKE :nationality', { nationality: `%${filter.nationality}%` });
      }
    }

    query.orderBy(`passenger.${sort?.sortBy ?? 'name'}`, sort?.order ?? 'ASC');

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

  async findOne(id: number): Promise<Passenger | null> {
    return await this.passengerRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePassengerInput: UpdatePassengerInput) {
    await this.passengerRepository.update(id, updatePassengerInput);
    return await this.passengerRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.passengerRepository.delete(id);
  }
}

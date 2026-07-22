import { Injectable } from '@nestjs/common';
import { CreatePassengerInput } from './dto/create-passenger.input';
import { UpdatePassengerInput } from './dto/update-passenger.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from 'src/passengers/entities/passenger.entity';

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

  async findAll() {
    return await this.passengerRepository.find();
  }

  async findOne(id: number): Promise<Passenger | null> {
    return await this.passengerRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePassengerInput: UpdatePassengerInput) {
    return await this.passengerRepository.update(id, updatePassengerInput);
  }

  async remove(id: number) {
    return await this.passengerRepository.delete(id);
  }
}

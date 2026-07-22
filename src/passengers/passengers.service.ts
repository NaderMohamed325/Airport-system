import { Injectable } from '@nestjs/common';
import { CreatePassengerInput } from './dto/create-passenger.input';
import { UpdatePassengerInput } from './dto/update-passenger.input';

@Injectable()
export class PassengersService {
  create(createPassengerInput: CreatePassengerInput) {
    return 'This action adds a new passenger';
  }

  findAll() {
    return `This action returns all passengers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passenger`;
  }

  update(id: number, updatePassengerInput: UpdatePassengerInput) {
    return `This action updates a #${id} passenger`;
  }

  remove(id: number) {
    return `This action removes a #${id} passenger`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateSeatInput } from './dto/create-seat.input';
import { UpdateSeatInput } from './dto/update-seat.input';

@Injectable()
export class SeatsService {
  create(createSeatInput: CreateSeatInput) {
    return 'This action adds a new seat';
  }

  findAll() {
    return `This action returns all seats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seat`;
  }

  update(id: number, updateSeatInput: UpdateSeatInput) {
    return `This action updates a #${id} seat`;
  }

  remove(id: number) {
    return `This action removes a #${id} seat`;
  }
}

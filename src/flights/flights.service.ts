import { Injectable } from '@nestjs/common';
import { CreateFlightInput } from './dto/create-flight.input';
import { UpdateFlightInput } from './dto/update-flight.input';

@Injectable()
export class FlightsService {
  create(createFlightInput: CreateFlightInput) {
    return 'This action adds a new flight';
  }

  findAll() {
    return `This action returns all flights`;
  }

  findOne(id: number) {
    return `This action returns a #${id} flight`;
  }

  update(id: number, updateFlightInput: UpdateFlightInput) {
    return `This action updates a #${id} flight`;
  }

  remove(id: number) {
    return `This action removes a #${id} flight`;
  }
}

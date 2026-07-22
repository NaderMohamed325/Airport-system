import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SeatsService } from './seats.service';
import { Seat } from './entities/seat.entity';
import { CreateSeatInput } from './dto/create-seat.input';
import { UpdateSeatInput } from './dto/update-seat.input';

@Resolver(() => Seat)
export class SeatsResolver {
  constructor(private readonly seatsService: SeatsService) {}

  @Mutation(() => Seat)
  createSeat(@Args('createSeatInput') createSeatInput: CreateSeatInput) {
    return this.seatsService.create(createSeatInput);
  }

  @Query(() => [Seat], { name: 'seats' })
  findAll() {
    return this.seatsService.findAll();
  }

  @Query(() => Seat, { name: 'seat' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.seatsService.findOne(id);
  }

  @Mutation(() => Seat)
  updateSeat(@Args('updateSeatInput') updateSeatInput: UpdateSeatInput) {
    return this.seatsService.update(updateSeatInput.id, updateSeatInput);
  }

  @Mutation(() => Seat)
  removeSeat(@Args('id', { type: () => Int }) id: number) {
    return this.seatsService.remove(id);
  }
}

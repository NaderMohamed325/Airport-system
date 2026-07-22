import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PassengersService } from './passengers.service';
import { Passenger } from './entities/passenger.entity';
import { CreatePassengerInput } from './dto/create-passenger.input';
import { UpdatePassengerInput } from './dto/update-passenger.input';

@Resolver(() => Passenger)
export class PassengersResolver {
  constructor(private readonly passengersService: PassengersService) {}

  @Mutation(() => Passenger)
  createPassenger(@Args('createPassengerInput') createPassengerInput: CreatePassengerInput) {
    return this.passengersService.create(createPassengerInput);
  }

  @Query(() => [Passenger], { name: 'passengers' })
  findAll() {
    return this.passengersService.findAll();
  }

  @Query(() => Passenger, { name: 'passenger' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.passengersService.findOne(id);
  }

  @Mutation(() => Passenger)
  updatePassenger(@Args('updatePassengerInput') updatePassengerInput: UpdatePassengerInput) {
    return this.passengersService.update(updatePassengerInput.id, updatePassengerInput);
  }

  @Mutation(() => Passenger)
  removePassenger(@Args('id', { type: () => Int }) id: number) {
    return this.passengersService.remove(id);
  }
}

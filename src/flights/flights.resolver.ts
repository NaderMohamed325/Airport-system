import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FlightsService } from './flights.service';
import { Flight } from './entities/flight.entity';
import { CreateFlightInput } from './dto/create-flight.input';
import { UpdateFlightInput } from './dto/update-flight.input';

@Resolver(() => Flight)
export class FlightsResolver {
  constructor(private readonly flightsService: FlightsService) {}

  @Mutation(() => Flight)
  createFlight(@Args('createFlightInput') createFlightInput: CreateFlightInput) {
    return this.flightsService.create(createFlightInput);
  }

  @Query(() => [Flight], { name: 'flights' })
  findAll() {
    return this.flightsService.findAll();
  }

  @Query(() => Flight, { name: 'flight' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.flightsService.findOne(id);
  }

  @Mutation(() => Flight)
  updateFlight(@Args('updateFlightInput') updateFlightInput: UpdateFlightInput) {
    return this.flightsService.update(updateFlightInput.id, updateFlightInput);
  }

  @Mutation(() => Flight)
  removeFlight(@Args('id', { type: () => Int }) id: number) {
    return this.flightsService.remove(id);
  }
}

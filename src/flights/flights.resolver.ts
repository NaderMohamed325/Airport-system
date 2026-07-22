import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FlightsService } from './flights.service';
import { Flight } from './entities/flight.entity';
import { CreateFlightInput } from './dto/create-flight.input';
import { UpdateFlightInput } from './dto/update-flight.input';
import { FlightPagination } from 'src/flights/entities/flight.pagination';
import { PaginationInput } from 'src/utils/pagination.dto';
import { FlightFilterInput } from 'src/flights/dto/gql/flight.filter.dto';
import { FlightSortInput } from 'src/flights/dto/gql/flight.sort.dto';

@Resolver(() => Flight)
export class FlightsResolver {
  constructor(private readonly flightsService: FlightsService) {}

  @Mutation(() => Flight)
  createFlight(@Args('createFlightInput') createFlightInput: CreateFlightInput) {
    return this.flightsService.create(createFlightInput);
  }

  @Query(() => FlightPagination, { name: 'flights' })
  findAll(
    @Args('pagination') pagination: PaginationInput,
    @Args('filter', { nullable: true }) filter?: FlightFilterInput,
    @Args('sort', { nullable: true }) sort?: FlightSortInput,
  ) {
    return this.flightsService.findAll(pagination, filter, sort);
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

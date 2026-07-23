import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { Flight } from './entities/flight.entity';
import { CreateFlightInput } from './dto/create-flight.input';
import { UpdateFlightInput } from './dto/update-flight.input';
import { FlightPagination } from 'src/flights/entities/flight.pagination';
import { PaginationInput } from 'src/utils/pagination.dto';
import { FlightFilterInput } from 'src/flights/dto/gql/flight.filter.dto';
import { FlightSortInput } from 'src/flights/dto/gql/flight.sort.dto';
import { GqlAuthGuard } from 'src/auth/gql/gql-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/custom.decorator';
import { Role } from 'src/users/enums/role.enum';

@Resolver(() => Flight)
export class FlightsResolver {
  constructor(private readonly flightsService: FlightsService) {}

  @Mutation(() => Flight)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.pilot, Role.crew, Role.security)
  createFlight(@Args('createFlightInput') createFlightInput: CreateFlightInput) {
    return this.flightsService.create(createFlightInput);
  }

  @Query(() => FlightPagination, { name: 'flights' })
  @UseGuards(GqlAuthGuard)
  findAll(
    @Args('pagination') pagination: PaginationInput,
    @Args('filter', { nullable: true }) filter?: FlightFilterInput,
    @Args('sort', { nullable: true }) sort?: FlightSortInput,
  ) {
    return this.flightsService.findAll(pagination, filter, sort);
  }

  @Query(() => Flight, { name: 'flight' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.flightsService.findOne(id);
  }

  @Mutation(() => Flight)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.pilot, Role.crew, Role.security)
  updateFlight(@Args('updateFlightInput') updateFlightInput: UpdateFlightInput) {
    return this.flightsService.update(updateFlightInput.id, updateFlightInput);
  }

  @Mutation(() => Flight)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.admin, Role.pilot, Role.crew, Role.security)
  removeFlight(@Args('id', { type: () => Int }) id: number) {
    return this.flightsService.remove(id);
  }
}

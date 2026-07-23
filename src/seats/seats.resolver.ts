import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { Seat } from './entities/seat.entity';
import { SeatPagination } from './entities/seat.pagination';
import { PaginationInput } from 'src/utils/pagination.dto';
import { SeatFilterInput } from './dto/gql/seat.filter.input';
import { SeatSortInput } from './dto/gql/seat.sort.input';
import { GqlAuthGuard } from 'src/auth/gql/gql-auth.guard';

@Resolver(() => Seat)
export class SeatsResolver {
  constructor(private readonly seatsService: SeatsService) {}

  @Query(() => SeatPagination, { name: 'seats' })
  @UseGuards(GqlAuthGuard)
  findAll(
    @Args('pagination') pagination: PaginationInput,
    @Args('filter', { nullable: true }) filter?: SeatFilterInput,
    @Args('sort', { nullable: true }) sort?: SeatSortInput,
  ) {
    return this.seatsService.findAll(pagination, filter, sort);
  }

  @Query(() => Seat, { name: 'seat' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.seatsService.findOne(id);
  }
}

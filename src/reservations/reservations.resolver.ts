import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { ReservationPagination } from './entities/reservation.pagination';
import { PaginationInput } from 'src/utils/pagination.dto';
import { ReservationFilterInput } from './dto/gql/reservation.filter.input';
import { ReservationSortInput } from './dto/gql/reservation.sort.input';
import { GqlAuthGuard } from 'src/auth/gql/gql-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/custom.decorator';
import { Role } from 'src/users/enums/role.enum';
import { GqlContext } from 'src/common/types/gql-context';

const STAFF_ROLES: Role[] = [Role.admin, Role.pilot, Role.crew, Role.security];

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => Reservation)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.passenger)
  createReservation(@Args('createReservationInput') createReservationInput: CreateReservationInput) {
    return this.reservationsService.create(createReservationInput);
  }

  @Query(() => ReservationPagination, { name: 'reservations' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(...STAFF_ROLES)
  async findAll(
    @Context() context: GqlContext,
    @Args('pagination') pagination: PaginationInput,
    @Args('filter', { nullable: true }) filter?: ReservationFilterInput,
    @Args('sort', { nullable: true }) sort?: ReservationSortInput,
  ) {
    const user = context.req.user;
    if (!STAFF_ROLES.includes(user.role as Role)) {
      filter = { ...filter, passengerId: user.id };
    }
    return this.reservationsService.findAll(pagination, filter, sort);
  }

  @Query(() => Reservation, { name: 'reservation' })
  @UseGuards(GqlAuthGuard)
  async findOne(@Args('id', { type: () => Int }) id: number, @Context() context: GqlContext) {
    const user = context.req.user;
    if (STAFF_ROLES.includes(user.role as Role)) {
      return this.reservationsService.findOne(id);
    }
    return this.reservationsService.findOneByPassenger(id, user.id);
  }

  @Mutation(() => Reservation)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(...STAFF_ROLES)
  updateReservation(@Args('updateReservationInput') updateReservationInput: UpdateReservationInput) {
    return this.reservationsService.update(updateReservationInput.id, updateReservationInput);
  }

  @Mutation(() => Reservation)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(...STAFF_ROLES)
  removeReservation(@Args('id', { type: () => Int }) id: number) {
    return this.reservationsService.remove(id);
  }
}

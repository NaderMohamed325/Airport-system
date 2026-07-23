import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { Passenger } from './entities/passenger.entity';
import { UpdatePassengerInput } from './dto/update-passenger.input';
import { PassengerPagination } from './entities/passenger.pagination';
import { PaginationInput } from 'src/utils/pagination.dto';
import { PassengerFilterInput } from './dto/gql/passenger.filter.input';
import { PassengerSortInput } from './dto/gql/passenger.sort.input';
import { GqlAuthGuard } from 'src/auth/gql/gql-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/custom.decorator';
import { Role } from 'src/users/enums/role.enum';
import { GqlContext } from 'src/common/types/gql-context';

const STAFF_ROLES: Role[] = [Role.admin, Role.pilot, Role.crew, Role.security];

@Resolver(() => Passenger)
export class PassengersResolver {
  constructor(private readonly passengersService: PassengersService) {}

  @Query(() => PassengerPagination, { name: 'passengers' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(...STAFF_ROLES)
  findAll(
    @Args('pagination') pagination: PaginationInput,
    @Args('filter', { nullable: true }) filter?: PassengerFilterInput,
    @Args('sort', { nullable: true }) sort?: PassengerSortInput,
  ) {
    return this.passengersService.findAll(pagination, filter, sort);
  }

  @Query(() => Passenger, { name: 'passenger' })
  @UseGuards(GqlAuthGuard)
  async findOne(@Args('id', { type: () => Int }) id: number, @Context() context: GqlContext) {
    const user = context.req.user;
    if (!STAFF_ROLES.includes(user.role as Role) && user.id !== id) {
      throw new ForbiddenException('You can only view your own profile');
    }
    return this.passengersService.findOne(id);
  }

  @Mutation(() => Passenger)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(...STAFF_ROLES)
  updatePassenger(@Args('updatePassengerInput') updatePassengerInput: UpdatePassengerInput) {
    return this.passengersService.update(updatePassengerInput.id, updatePassengerInput);
  }

  @Mutation(() => Passenger)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(...STAFF_ROLES)
  removePassenger(@Args('id', { type: () => Int }) id: number) {
    return this.passengersService.remove(id);
  }
}

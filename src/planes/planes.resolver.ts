import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { Plane } from './entities/plane.entity';
import { CreatePlaneInput } from './dto/create-plane.input';
import { UpdatePlaneInput } from './dto/update-plane.input';
import { PlanePagination } from './entities/plane.pagination';
import { PaginationInput } from 'src/utils/pagination.dto';
import { PlaneFilterInput } from './dto/gql/plane.filter.input';
import { PlaneSortInput } from './dto/gql/plane.sort.input';
import { GqlAuthGuard } from 'src/auth/gql/gql-auth.guard';
import { GqlContext } from 'src/common/types/gql-context';
import { Role } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/custom.decorator';

const STAFF_ROLES: Role[] = [Role.admin, Role.pilot, Role.crew, Role.security];

@Resolver(() => Plane)
export class PlanesResolver {
  constructor(private readonly planesService: PlanesService) {}

  @Mutation(() => Plane)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.admin)
  async createPlane(@Args('createPlaneInput') createPlaneInput: CreatePlaneInput, @Context() context: GqlContext) {
    return this.planesService.create(createPlaneInput, context.req.user.id);
  }

  @Query(() => PlanePagination, { name: 'planes' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(...STAFF_ROLES)
  findAll(
    @Args('pagination') pagination: PaginationInput,
    @Args('filter', { nullable: true }) filter?: PlaneFilterInput,
    @Args('sort', { nullable: true }) sort?: PlaneSortInput,
  ) {
    return this.planesService.findAll(pagination, filter, sort);
  }

  @Query(() => Plane, { name: 'plane' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(...STAFF_ROLES)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.planesService.findOne(id);
  }

  @Mutation(() => Plane)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(...STAFF_ROLES)
  updatePlane(@Args('updatePlaneInput') updatePlaneInput: UpdatePlaneInput) {
    return this.planesService.update(updatePlaneInput.id, updatePlaneInput);
  }

  @Mutation(() => Plane)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(...STAFF_ROLES)
  removePlane(@Args('id', { type: () => Int }) id: number) {
    return this.planesService.remove(id);
  }
}

import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import { Staff } from './entities/staff.entity';
import { CreateStaffInput } from './dto/create-staff.input';
import { UpdateStaffInput } from './dto/update-staff.input';
import { StaffPagination } from './entities/staff.pagination';
import { PaginationInput } from 'src/utils/pagination.dto';
import { StaffFilterInput } from './dto/gql/staff.filter.input';
import { StaffSortInput } from './dto/gql/staff.sort.input';
import { GqlAuthGuard } from 'src/auth/gql/gql-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/custom.decorator';
import { Role } from 'src/users/enums/role.enum';
import { GqlContext } from 'src/common/types/gql-context';

const STAFF_ROLES: Role[] = [Role.admin, Role.pilot, Role.crew, Role.security];

@Resolver(() => Staff)
export class StaffResolver {
  constructor(private readonly staffService: StaffService) {}

  @Mutation(() => Staff)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(...STAFF_ROLES)
  createStaff(@Args('createStaffInput') createStaffInput: CreateStaffInput) {
    return this.staffService.create(createStaffInput);
  }

  @Query(() => StaffPagination, { name: 'staffMembers' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(...STAFF_ROLES)
  findAll(
    @Args('pagination') pagination: PaginationInput,
    @Args('filter', { nullable: true }) filter?: StaffFilterInput,
    @Args('sort', { nullable: true }) sort?: StaffSortInput,
  ) {
    return this.staffService.findAll(pagination, filter, sort);
  }

  @Query(() => Staff, { name: 'staff' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(...STAFF_ROLES)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.staffService.findOne(id);
  }

  @Mutation(() => Staff)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(...STAFF_ROLES)
  updateStaff(@Args('updateStaffInput') updateStaffInput: UpdateStaffInput) {
    return this.staffService.update(updateStaffInput.id, updateStaffInput);
  }

  @Mutation(() => Staff)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(...STAFF_ROLES)
  removeStaff(@Args('id', { type: () => Int }) id: number) {
    return this.staffService.remove(id);
  }

  @Query(() => Staff)
  @UseGuards(GqlAuthGuard)
  async getMyStaffProfile(@Context() context: GqlContext) {
    const user = context.req.user;
    return await this.staffService.findOne(user.id);
  }
}

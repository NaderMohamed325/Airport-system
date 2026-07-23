import { Field, ObjectType } from '@nestjs/graphql';
import { Staff } from 'src/staff/entities/staff.entity';

@ObjectType()
export class StaffPagination {
  @Field(() => [Staff])
  data: Staff[];

  @Field()
  total: number;

  @Field()
  page: number;

  @Field()
  totalPages: number;
}

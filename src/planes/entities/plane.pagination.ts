import { Field, ObjectType } from '@nestjs/graphql';
import { Plane } from 'src/planes/entities/plane.entity';

@ObjectType()
export class PlanePagination {
  @Field(() => [Plane])
  data: Plane[];

  @Field()
  total: number;

  @Field()
  page: number;

  @Field()
  totalPages: number;
}

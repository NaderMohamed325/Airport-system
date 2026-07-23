import { Field, ObjectType } from '@nestjs/graphql';
import { Seat } from 'src/seats/entities/seat.entity';

@ObjectType()
export class SeatPagination {
  @Field(() => [Seat])
  data: Seat[];

  @Field()
  total: number;

  @Field()
  page: number;

  @Field()
  totalPages: number;
}

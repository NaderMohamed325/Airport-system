import { Field, ObjectType } from '@nestjs/graphql';
import { Reservation } from 'src/reservations/entities/reservation.entity';

@ObjectType()
export class ReservationPagination {
  @Field(() => [Reservation])
  data: Reservation[];

  @Field()
  total: number;

  @Field()
  page: number;

  @Field()
  totalPages: number;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { Flight } from 'src/flights/entities/flight.entity';


@ObjectType()
export class FlightPagination {
  @Field(() => [Flight])
  data: Flight[];

  @Field()
  total: number;

  @Field()
  page: number;

  @Field()
  totalPages: number;
}

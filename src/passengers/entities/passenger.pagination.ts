import { Field, ObjectType } from '@nestjs/graphql';
import { Passenger } from 'src/passengers/entities/passenger.entity';

@ObjectType()
export class PassengerPagination {
  @Field(() => [Passenger])
  data: Passenger[];

  @Field()
  total: number;

  @Field()
  page: number;

  @Field()
  totalPages: number;
}

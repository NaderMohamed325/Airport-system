import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class CreateReservationInput {
  @Field(() => Int)
  @IsInt()
  flightId: number;

  @Field(() => Int)
  @IsInt()
  passengerId: number;

  @Field(() => Int)
  @IsInt()
  seatId: number;
}

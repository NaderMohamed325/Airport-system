import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class ReservationFilterInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  flightId?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  passengerId?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  seatId?: number;
}

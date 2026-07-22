import { InputType, Int, Field, GraphQLISODateTime } from '@nestjs/graphql';

import { IsString, IsInt, IsDateString, Min, IsDate } from 'class-validator';

@InputType()
export class CreateFlightInput {
  @Field()
  @IsString()
  departure: string;

  @Field()
  @IsString()
  arrival: string;

  @Field(() => GraphQLISODateTime)
  @IsDate()
  departureTime: Date;

  @Field(() => GraphQLISODateTime)
  @IsDate()
  arrivalTime: Date;

  @Field()
  @IsString()
  airline: string;

  @Field()
  @IsInt()
  @Min(0)
  availableSeats: number;
}

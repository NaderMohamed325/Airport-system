import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql';

import { IsDate, IsInt, IsObject, IsString, Min } from 'class-validator';
import { Plane } from 'src/planes/entities/plane.entity';

@InputType()
export class CreateFlightInput {
  @Field()
  @IsString()
  departure: string;

  @Field()
  @IsString()
  arrival: string;

  @Field(() => Int)
  @IsInt()
  planeId: number;

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

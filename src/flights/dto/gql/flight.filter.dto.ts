import { Field, InputType } from '@nestjs/graphql';
import { FlightStatus } from 'src/flights/entities/flightStatus.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

@InputType()
export class FlightFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  departure?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  arrival?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  airline?: string;

  @Field(() => FlightStatus, { nullable: true })
  @IsOptional()
  @IsEnum(FlightStatus)
  status?: FlightStatus;
}

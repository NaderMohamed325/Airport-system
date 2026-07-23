import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { SeatStatusEnum } from 'src/seats/entities/seatStatus.enum';

@InputType()
export class SeatFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  seatNumber?: string;

  @Field(() => SeatStatusEnum, { nullable: true })
  @IsOptional()
  @IsEnum(SeatStatusEnum)
  status?: SeatStatusEnum;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  planeId?: number;
}

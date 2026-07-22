import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SeatStatusEnum } from 'src/seats/entities/seatStatus.enum';

@ObjectType()
export class Seat {
  @Field(() => Int)
  id: number;

  @Field()
  seatNumber: string;

  @Field(() => SeatStatusEnum)
  status:SeatStatusEnum;

  @Field(() => Date, { nullable: true })
  lockedAt: Date;


}

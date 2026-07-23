import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SeatStatusEnum } from 'src/seats/entities/seatStatus.enum';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Plane } from 'src/planes/entities/plane.entity';

@Entity()
@ObjectType()
export class Seat {
  @Field(() => Int)
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Field(() => String)
  @Column({ length: 10 })
  seatNumber: string;

  @Field(() => SeatStatusEnum)
  @Column({
    type: 'enum',
    enum: SeatStatusEnum,
    default: SeatStatusEnum.AVAILABLE,
  })
  status: SeatStatusEnum;

  @Field(() => Date, { nullable: true })
  lockedAt: Date;

  @Field(() => [Reservation], { nullable: true })
  @OneToMany(() => Reservation, (reservation) => reservation.seat)
  reservations: Reservation[];

  @Field(() => Plane)
  @ManyToOne(() => Plane, (plane) => plane.seats, { nullable: false })
  plane: Plane;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  lockedUntil: Date;
}

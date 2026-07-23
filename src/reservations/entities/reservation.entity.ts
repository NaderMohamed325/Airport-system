import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AuditEntity } from 'src/utils/audit.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Flight } from 'src/flights/entities/flight.entity';
import { Passenger } from 'src/passengers/entities/passenger.entity';
import { Seat } from 'src/seats/entities/seat.entity';

@ObjectType()
@Entity()
export class Reservation extends AuditEntity {
  @PrimaryGeneratedColumn('identity')
  @Field(() => Int)
  id: number;

  @Field(() => Flight)
  @ManyToOne(() => Flight, (flight) => flight.reservations, { nullable: false })
  flight: Flight;

  @Field(() => Passenger)
  @ManyToOne(() => Passenger, (passenger) => passenger.reservations, { nullable: false })
  passenger: Passenger;

  @Field(() => Seat)
  @ManyToOne(() => Seat, (seat) => seat.reservations, { nullable: false })
  seat: Seat;


}

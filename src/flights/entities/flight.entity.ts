import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FlightStatus } from './flightStatus.enum';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Plane } from 'src/planes/entities/plane.entity';

registerEnumType(FlightStatus, {
  name: 'FlightStatus',
});

@ObjectType()
@Entity()
export class Flight {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  @Generated('uuid')
  flightNumber: string;

  @Field()
  @Column()
  departure: string;

  @Field()
  @Column()
  arrival: string;

  @Field(() => Date)
  @Column({ type: 'timestamp' })
  departureTime: Date;

  @Field(() => Date)
  @Column({ type: 'timestamp' })
  arrivalTime: Date;

  @Field()
  @Column()
  airline: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  availableSeats: number;

  @Field(() => FlightStatus)
  @Column({
    type: 'enum',
    enum: FlightStatus,
    default: FlightStatus.SCHEDULED,
  })
  status: FlightStatus;

  @Field(() => Plane)
  @ManyToOne(() => Plane, (plane) => plane.flights, { nullable: false })
  plane: Plane;

  @Field(() => [Reservation])
  @OneToMany(() => Reservation, (reservation) => reservation.flight)
  reservations: Reservation[];
}

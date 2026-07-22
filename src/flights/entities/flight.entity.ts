import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { FlightStatus } from './flightStatus.enum';

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
}

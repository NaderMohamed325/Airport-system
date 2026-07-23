import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Flight } from 'src/flights/entities/flight.entity';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Role } from 'src/users/enums/role.enum';
import { Reservation } from 'src/reservations/entities/reservation.entity';

@ObjectType()
@Entity()
export class Passenger extends User {
  @ManyToMany(() => Flight)
  @JoinTable()
  @Field(() => [Flight])
  flights: Flight[];

  @Field()
  @Column({ length: 20, unique: true })
  passportNumber: string;

  @Field()
  @Column({ length: 50 })
  nationality: string;

  @Field(() => [Reservation])
  @OneToMany(() => Reservation, (reservation) => reservation.passenger)
  reservations: Reservation[];

  @BeforeInsert()
  setRole() {
    this.role = Role.passenger;
  }
}

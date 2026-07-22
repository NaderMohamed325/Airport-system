import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Flight } from 'src/flights/entities/flight.entity';
import { BeforeInsert, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Role } from 'src/users/enums/role.enum';

@ObjectType()
@Entity()
export class Passenger extends User {
  @ManyToMany(() => Flight)
  @JoinTable()
  @Field(() => [Flight])
  flights: Flight[];

  @BeforeInsert()
  setRole() {
    this.roles = Role.passenger;
  }
}

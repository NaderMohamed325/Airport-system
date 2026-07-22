import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Flight } from 'src/flights/entities/flight.entity';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Role } from 'src/users/enums/role.enum';

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

  @BeforeInsert()
  setRole() {
    this.role = Role.passenger;
  }
}

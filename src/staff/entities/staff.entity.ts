import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Plane } from 'src/planes/entities/plane.entity';

@ObjectType()
@Entity()
export class Staff extends User {
  @Field(() => [Plane])
  @OneToMany(() => Plane, (plane) => plane.createdBy)
  assignedPlanes: Plane[];
}

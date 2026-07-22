import { Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Role } from '../enums/role.enum';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column({ select: false })
  @Field()
  password: string;

  @Column({ default: true })
  @Field()
  isActive: boolean;

  @Field(() => Role)
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.standard,
  })
  roles: Role;
}

import { BeforeUpdate, Column, CreateDateColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
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
  role: Role;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      const bcrypt = require('bcrypt');
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }
}

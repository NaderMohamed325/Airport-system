import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Staff } from 'src/staff/entities/staff.entity';

@ObjectType()
@Entity()
export class Plane {
  @PrimaryGeneratedColumn('identity')
  @Field(() => Int)
  id: number;

  @Field()
  @Column({ length: 20 })
  model: string;

  @Field(() => Int)
  @Column({ default: 90 })
  capacity: number;

  @Field()
  @OneToOne(() => Staff)
  @JoinColumn()
  createdBy: Staff;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

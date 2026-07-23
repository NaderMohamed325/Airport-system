import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Staff } from 'src/staff/entities/staff.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { Flight } from 'src/flights/entities/flight.entity';
import { IsInt, IsString } from 'class-validator';

@ObjectType()
@Entity()
export class Plane {
  @PrimaryGeneratedColumn('identity')
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field()
  @Column({ length: 20 })
  @IsString()
  model: string;

  @Field(() => Int)
  @Column({ default: 90 })
  @IsInt()
  capacity: number;

  @Field(() => [Flight])
  @OneToMany(() => Flight, (flight) => flight.plane)
  flights: Flight[];

  @Field(() => [Seat])
  @OneToMany(() => Seat, (seat) => seat.plane)
  seats: Seat[];

  @Field(() => Staff)
  @ManyToOne(() => Staff, (staff) => staff.assignedPlanes, { nullable: false })
  createdBy: Staff;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

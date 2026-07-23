import { BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field } from '@nestjs/graphql';

export class AuditEntity {
  @CreateDateColumn()
  @Field()
  createdAt: Date;
  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

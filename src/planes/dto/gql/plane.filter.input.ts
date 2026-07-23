import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class PlaneFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  model?: string;
}

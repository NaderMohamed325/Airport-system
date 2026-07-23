import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString, Min } from 'class-validator';

@InputType()
export class CreatePlaneInput {
  @Field(() => String)
  @IsString()
  model: string;

  @Field(() => Int)
  @IsInt()
  @Min(90, { message: 'Capacity must be at least 90' })
  capacity: number;
}

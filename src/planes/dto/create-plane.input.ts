import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlaneInput {
  @Field(() => String)
  model: string;

  @Field(() => Int)
  capacity: number;
}

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSeatInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

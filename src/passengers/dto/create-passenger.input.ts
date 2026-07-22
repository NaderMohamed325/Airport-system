import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePassengerInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

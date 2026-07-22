import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFlightInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

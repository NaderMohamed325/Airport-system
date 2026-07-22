import { CreateFlightInput } from './create-flight.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFlightInput extends PartialType(CreateFlightInput) {
  @Field(() => Int)
  id: number;
}

import { CreatePassengerInput } from './create-passenger.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePassengerInput extends PartialType(CreatePassengerInput) {
  @Field(() => Int)
  id: number;
}

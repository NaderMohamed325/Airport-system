import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePassengerInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field()
  password: string;

  @Field(() => String)
  nationality: string;

  @Field(() => String)
  passportNumber: string;
}

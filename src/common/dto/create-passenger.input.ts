import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreatePassengerInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;

  @Field(() => String)
  @IsString()
  nationality: string;

  @Field(() => String)
  @IsString()
  passportNumber: string;
}

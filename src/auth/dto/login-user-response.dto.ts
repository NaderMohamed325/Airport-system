import { CreatePassengerResponseDto } from 'src/auth/dto/create-passenger-response.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class LoginUserResponseDto extends CreatePassengerResponseDto {
  @Field(() => String)
  @IsString()
  accessToken: string;
}

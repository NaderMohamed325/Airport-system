import { CreateStaffResponseDto } from './create-staff-response.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class LoginStaffResponseDto extends CreateStaffResponseDto {
  @Field(() => String)
  @IsString()
  accessToken: string;
}

import { Passenger } from 'src/passengers/entities/passenger.entity';
import { ObjectType, OmitType } from '@nestjs/graphql';

@ObjectType()
export class CreatePassengerResponseDto extends OmitType(Passenger, ['password'] as const) {}

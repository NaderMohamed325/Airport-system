import { registerEnumType } from '@nestjs/graphql';

export enum SeatStatusEnum {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
}

registerEnumType(SeatStatusEnum, { name: 'SeatStatusEnum', description: 'The status of a seat' });

import { registerEnumType } from '@nestjs/graphql';

export enum SeatStatusEnum {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
  OCCUPIED = 'occupied',
}

registerEnumType(SeatStatusEnum, { name: 'SeatStatusEnum', description: 'The status of a seat' });

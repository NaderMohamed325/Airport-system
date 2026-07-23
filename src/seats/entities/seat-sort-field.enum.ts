import { registerEnumType } from '@nestjs/graphql';

export enum SeatSortField {
  SEAT_NUMBER = 'seatNumber',
  STATUS = 'status',
}

registerEnumType(SeatSortField, { name: 'SeatSortField' });

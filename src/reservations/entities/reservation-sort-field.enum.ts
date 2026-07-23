import { registerEnumType } from '@nestjs/graphql';

export enum ReservationSortField {
  ID = 'id',
  CREATED_AT = 'createdAt',
}

registerEnumType(ReservationSortField, { name: 'ReservationSortField' });

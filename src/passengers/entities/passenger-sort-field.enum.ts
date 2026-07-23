import { registerEnumType } from '@nestjs/graphql';

export enum PassengerSortField {
  NAME = 'name',
  EMAIL = 'email',
  CREATED_AT = 'createdAt',
}

registerEnumType(PassengerSortField, { name: 'PassengerSortField' });

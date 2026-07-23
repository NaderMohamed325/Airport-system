import { registerEnumType } from '@nestjs/graphql';

export enum StaffSortField {
  NAME = 'name',
  EMAIL = 'email',
  ROLE = 'role',
  CREATED_AT = 'createdAt',
}

registerEnumType(StaffSortField, { name: 'StaffSortField' });

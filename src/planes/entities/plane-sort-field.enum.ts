import { registerEnumType } from '@nestjs/graphql';

export enum PlaneSortField {
  MODEL = 'model',
  CAPACITY = 'capacity',
  CREATED_AT = 'createdAt',
}

registerEnumType(PlaneSortField, { name: 'PlaneSortField' });

import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { PlaneSortField } from 'src/planes/entities/plane-sort-field.enum';
import { SortOrder } from 'src/common/enums/sort-order.enum';

@InputType()
export class PlaneSortInput {
  @Field(() => PlaneSortField, { defaultValue: PlaneSortField.CREATED_AT })
  @IsEnum(PlaneSortField)
  sortBy: PlaneSortField;

  @Field(() => SortOrder, { defaultValue: SortOrder.ASC })
  @IsEnum(SortOrder)
  order: SortOrder;
}

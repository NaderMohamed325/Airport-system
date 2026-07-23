import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { StaffSortField } from 'src/staff/entities/staff-sort-field.enum';
import { SortOrder } from 'src/common/enums/sort-order.enum';

@InputType()
export class StaffSortInput {
  @Field(() => StaffSortField, { defaultValue: StaffSortField.CREATED_AT })
  @IsEnum(StaffSortField)
  sortBy: StaffSortField;

  @Field(() => SortOrder, { defaultValue: SortOrder.ASC })
  @IsEnum(SortOrder)
  order: SortOrder;
}

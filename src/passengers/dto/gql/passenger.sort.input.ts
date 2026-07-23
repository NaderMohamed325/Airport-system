import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { PassengerSortField } from 'src/passengers/entities/passenger-sort-field.enum';
import { SortOrder } from 'src/common/enums/sort-order.enum';

@InputType()
export class PassengerSortInput {
  @Field(() => PassengerSortField, { defaultValue: PassengerSortField.CREATED_AT })
  @IsEnum(PassengerSortField)
  sortBy: PassengerSortField;

  @Field(() => SortOrder, { defaultValue: SortOrder.ASC })
  @IsEnum(SortOrder)
  order: SortOrder;
}

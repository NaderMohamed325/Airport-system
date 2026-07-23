import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { SeatSortField } from 'src/seats/entities/seat-sort-field.enum';
import { SortOrder } from 'src/common/enums/sort-order.enum';

@InputType()
export class SeatSortInput {
  @Field(() => SeatSortField, { defaultValue: SeatSortField.SEAT_NUMBER })
  @IsEnum(SeatSortField)
  sortBy: SeatSortField;

  @Field(() => SortOrder, { defaultValue: SortOrder.ASC })
  @IsEnum(SortOrder)
  order: SortOrder;
}

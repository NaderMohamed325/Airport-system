import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { ReservationSortField } from 'src/reservations/entities/reservation-sort-field.enum';
import { SortOrder } from 'src/common/enums/sort-order.enum';

@InputType()
export class ReservationSortInput {
  @Field(() => ReservationSortField, { defaultValue: ReservationSortField.CREATED_AT })
  @IsEnum(ReservationSortField)
  sortBy: ReservationSortField;

  @Field(() => SortOrder, { defaultValue: SortOrder.ASC })
  @IsEnum(SortOrder)
  order: SortOrder;
}

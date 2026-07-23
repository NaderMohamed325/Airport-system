import { Field, InputType } from '@nestjs/graphql';
import { FlightSortField } from 'src/flights/entities/flightStatus.enum';
import { SortOrder } from 'src/common/enums/sort-order.enum';
import { IsEnum } from 'class-validator';

@InputType()
export class FlightSortInput {
  @Field(() => FlightSortField, {
    defaultValue: FlightSortField.DEPARTURE_TIME,
  })
  @IsEnum(FlightSortField)
  sortBy: FlightSortField;

  @Field(() => SortOrder, {
    defaultValue: SortOrder.ASC,
  })
  @IsEnum(SortOrder)
  order: SortOrder;
}

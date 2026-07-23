import { registerEnumType } from '@nestjs/graphql';

export enum FlightStatus {
  SCHEDULED = 'scheduled',
  DELAYED = 'delayed',
  CANCELLED = 'cancelled',
  IN_AIR = 'in_air',
  LANDED = 'landed',
}
registerEnumType(FlightStatus, {
  name: 'FlightStatus',
});
export enum FlightSortField {
  DEPARTURE_TIME = 'departureTime',
  ARRIVAL_TIME = 'arrivalTime',
  AIRLINE = 'airline',
  AVAILABLE_SEATS = 'availableSeats',
}

registerEnumType(FlightSortField, {
  name: 'FlightSortField',
});

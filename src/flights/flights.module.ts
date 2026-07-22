import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsResolver } from './flights.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from 'src/flights/entities/flight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flight])],
  providers: [FlightsResolver, FlightsService],
  exports: [FlightsService, TypeOrmModule],

})
export class FlightsModule {}

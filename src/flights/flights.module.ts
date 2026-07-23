import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsResolver } from './flights.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from 'src/flights/entities/flight.entity';
import { SeatsModule } from 'src/seats/seats.module';
import { PlanesModule } from 'src/planes/planes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Flight]), SeatsModule,PlanesModule],
  providers: [FlightsResolver, FlightsService],
  exports: [FlightsService, TypeOrmModule],
})
export class FlightsModule {}

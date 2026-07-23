import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsResolver } from './seats.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  providers: [SeatsResolver, SeatsService],
  exports: [SeatsService],
})
export class SeatsModule {}

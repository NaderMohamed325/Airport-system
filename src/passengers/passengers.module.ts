import { Module } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { PassengersResolver } from './passengers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from './entities/passenger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger])],
  providers: [PassengersResolver, PassengersService],
  exports: [PassengersService],
})
export class PassengersModule {}

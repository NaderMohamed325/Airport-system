import { Module } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { PassengersResolver } from './passengers.resolver';

@Module({
  providers: [PassengersResolver, PassengersService],
})
export class PassengersModule {}

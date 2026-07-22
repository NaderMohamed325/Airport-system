import { Module } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { PlanesResolver } from './planes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plane } from './entities/plane.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plane])],
  providers: [PlanesResolver, PlanesService],
})
export class PlanesModule {}

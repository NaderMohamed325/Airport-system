import { Module } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { PlanesResolver } from './planes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plane } from './entities/plane.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Plane]), AuthModule],
  providers: [PlanesResolver, PlanesService],
  exports: [PlanesService],
})
export class PlanesModule {}

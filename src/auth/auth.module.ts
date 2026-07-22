import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassengersModule } from 'src/passengers/passengers.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/strategy/constants';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    PassengersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RolesGuard],
})
export class AuthModule {}

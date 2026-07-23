import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassengersModule } from 'src/passengers/passengers.module';
import { StaffModule } from 'src/staff/staff.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/strategy/constants';
import { RolesGuard } from './guards/roles.guard';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  imports: [
    PassengersModule,
    StaffModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, RolesGuard, AuthResolver, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

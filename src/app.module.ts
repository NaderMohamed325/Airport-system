import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FlightsModule } from './flights/flights.module';
import { PassengersModule } from './passengers/passengers.module';
import { StaffModule } from './staff/staff.module';
import configuration from './config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { SeatsModule } from './seats/seats.module';
import { PlanesModule } from './planes/planes.module';
import { ReservationsModule } from './reservations/reservations.module';
import { Request } from 'express';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: './src/schema.gql',
      sortSchema: true,
      context: ({ req }: { req: Request }) => ({ req }),
      formatError(formattedError, error) {
        if (formattedError.extensions?.code === 'INTERNAL_SERVER_ERROR' && process.env.NODE_ENV === 'production') {
          return new Error('Internal server error');
        }
        return formattedError;
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        if (!dbConfig) {
          throw new Error('Database configuration is missing');
        }
        return dbConfig;
      },
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    FlightsModule,
    PassengersModule,
    StaffModule,
    AuthModule,
    SeatsModule,
    PlanesModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_FILTER',
      useClass: require('./utils/gql.filter').GraphQLExceptionFilter,
    },
  ],
})
export class AppModule {}

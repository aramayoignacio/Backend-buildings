import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BuildingsModule } from './buildings/buildings.module';
import { WorkersModule } from './workers/workers.module';
import { FloorsModule } from './floors/floors.module';
import { GaragesModule } from './garages/garages.module';
import { OwnersModule } from './owners/owners.module';
import { SectorsModule } from './sectors/sectors.module';
import { TenantsModule } from './tenants/tenants.module';
import { UnitsModule } from './units/units.module';
import { WorkerRolesModule } from './worker-roles/worker-roles.module';
import { UnitTypesModule } from './unit-types/unit-types.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/database_name',
      // host: process.env.DATABASE_HOST || 'localhost',
      // port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      // username: process.env.DATABASE_USER || 'root',
      // password: process.env.DATABASE_PASSWORD || 'root',
      // database: process.env.DATABASE_NAME || 'test',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UsersModule,
    BuildingsModule,
    WorkersModule,
    FloorsModule,
    GaragesModule,
    OwnersModule,
    SectorsModule,
    TenantsModule,
    UnitsModule,
    WorkerRolesModule,
    UnitTypesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

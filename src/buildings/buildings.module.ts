import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import { FloorsModule } from 'src/floors/floors.module';
import { FloorsService } from 'src/floors/floors.service';
import { Floor } from 'src/floors/entities/floor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Building,Floor]),FloorsModule],
  controllers: [BuildingsController],
  providers: [BuildingsService, FloorsService],
})
export class BuildingsModule {}

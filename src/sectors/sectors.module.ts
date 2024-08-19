import { Module } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { SectorsController } from './sectors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sector } from './entities/sector.entity';
import { Floor } from 'src/floors/entities/floor.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Sector, Floor])],
  controllers: [SectorsController],
  providers: [SectorsService],
})
export class SectorsModule {}

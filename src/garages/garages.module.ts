import { Module } from '@nestjs/common';
import { GaragesService } from './garages.service';
import { GaragesController } from './garages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Garage } from './entities/garage.entity';
import { Building } from 'src/buildings/entities/building.entity';
import { Unit } from 'src/units/entities/unit.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Garage,Building,Unit])],
  controllers: [GaragesController],
  providers: [GaragesService],
})
export class GaragesModule {}

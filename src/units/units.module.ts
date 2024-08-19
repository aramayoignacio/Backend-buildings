import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { UnitType } from 'src/unit-types/entities/unit-type.entity';
import { Sector } from 'src/sectors/entities/sector.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Unit, UnitType, Sector])],
  controllers: [UnitsController],
  providers: [UnitsService],
})
export class UnitsModule {}

import { Module } from '@nestjs/common';
import { UnitTypesService } from './unit-types.service';
import { UnitTypesController } from './unit-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitType } from './entities/unit-type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UnitType])],
  controllers: [UnitTypesController],
  providers: [UnitTypesService],
})
export class UnitTypesModule {}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnitTypesService } from './unit-types.service';
import { CreateUnitTypeDto } from './dto/create-unit-type.dto';
import { UpdateUnitTypeDto } from './dto/update-unit-type.dto';

@Controller('unit-types')
export class UnitTypesController {
  constructor(private readonly unitTypesService: UnitTypesService) {}

  @Post()
  create(@Body() createUnitTypeDto: CreateUnitTypeDto) {
    return this.unitTypesService.create(createUnitTypeDto);
  }

  @Get()
  findAll() {
    return this.unitTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnitTypeDto: UpdateUnitTypeDto) {
    return this.unitTypesService.update(+id, updateUnitTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitTypesService.remove(+id);
  }
}

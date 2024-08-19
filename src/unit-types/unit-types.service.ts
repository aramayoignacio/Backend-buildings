import { Injectable } from '@nestjs/common';
import { CreateUnitTypeDto } from './dto/create-unit-type.dto';
import { UpdateUnitTypeDto } from './dto/update-unit-type.dto';

@Injectable()
export class UnitTypesService {
  create(createUnitTypeDto: CreateUnitTypeDto) {
    return 'This action adds a new unitType';
  }

  findAll() {
    return `This action returns all unitTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unitType`;
  }

  update(id: number, updateUnitTypeDto: UpdateUnitTypeDto) {
    return `This action updates a #${id} unitType`;
  }

  remove(id: number) {
    return `This action removes a #${id} unitType`;
  }
}

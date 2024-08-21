import { Injectable } from '@nestjs/common';
import { CreateUnitTypeDto } from './dto/create-unit-type.dto';
import { UpdateUnitTypeDto } from './dto/update-unit-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UnitType } from './entities/unit-type.entity';
import { Repository } from 'typeorm';
import { responseOk } from 'utils';

@Injectable()
export class UnitTypesService {
  constructor (
    @InjectRepository(UnitType)
    private readonly repository: Repository<UnitType>
  ){}
  create(createUnitTypeDto: CreateUnitTypeDto) {
    return 'This action adds a new unitType';
  }

  async findAll() {
    return responseOk(await this.repository.find());
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

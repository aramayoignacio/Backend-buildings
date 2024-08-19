import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { Repository } from 'typeorm';
import { Sector } from 'src/sectors/entities/sector.entity';
import { UnitType } from 'src/unit-types/entities/unit-type.entity';
import { responseOk } from 'utils';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private readonly repository: Repository<Unit>,
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,
    @InjectRepository(UnitType)
    private readonly unitTypeRepository: Repository<UnitType>,
  ) { }
  async create(createUnitDto: CreateUnitDto) {
    try {
      const sector = await this.sectorRepository.findOne({ where: { id: createUnitDto.sectorId } });
      const type = await this.unitTypeRepository.findOne({ where: { id: createUnitDto.typeId } });
      const unit = this.repository.create({ sector, type, keys: createUnitDto.keys, name: createUnitDto.name });
      return responseOk(await this.repository.save(unit));
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all units`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unit`;
  }

  update(id: number, updateUnitDto: UpdateUnitDto) {
    return `This action updates a #${id} unit`;
  }

  remove(id: number) {
    return `This action removes a #${id} unit`;
  }
}

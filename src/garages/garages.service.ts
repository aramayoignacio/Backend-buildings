import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateGarageDto } from './dto/create-garage.dto';
import { UpdateGarageDto } from './dto/update-garage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Garage } from './entities/garage.entity';
import { Repository } from 'typeorm';
import { Building } from 'src/buildings/entities/building.entity';
import { Unit } from 'src/units/entities/unit.entity';
import { responseOk } from 'utils';

@Injectable()
export class GaragesService {
  constructor(
    @InjectRepository(Garage)
    private readonly repository: Repository<Garage>,
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>
  ) { }

  async create(createGarageDto: CreateGarageDto) {
    try {
      const building = await this.buildingRepository.findOne({ where: { id: createGarageDto.buildingId } });
      const unit = createGarageDto.unitId ? await this.unitRepository.findOne({ where: { id: createGarageDto.unitId } }) : null;
      if (!building) {
        throw new NotFoundException();
      }
      const garage = this.repository.create({ ...createGarageDto, building, unit })
      return responseOk(await this.repository.save(garage));
    } catch (err) {
      console.error("Error creando garage", err);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all garages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} garage`;
  }

  update(id: number, updateGarageDto: UpdateGarageDto) {
    return `This action updates a #${id} garage`;
  }

  remove(id: number) {
    return `This action removes a #${id} garage`;
  }
}

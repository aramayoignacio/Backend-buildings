import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Floor } from './entities/floor.entity';
import { Repository } from 'typeorm';
import { Building } from 'src/buildings/entities/building.entity';

@Injectable()
export class FloorsService {
  constructor(
    @InjectRepository(Floor)
    private readonly repository: Repository<Floor>,
  ) { }

  async create(createFloorDto: CreateFloorDto) {
    return;
  }

  async createBulk(building: Building, floor: number) {
    try {
      const floorsToCreate = [];
      for (let i = 1; i <= floor; i++) {
        floorsToCreate.push(this.repository.create({ numberInBuilding: i, building }))
      }
      console.log("voy a crear estos: ", floorsToCreate)
      return await this.repository.save(floorsToCreate);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all floors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} floor`;
  }

  update(id: number, updateFloorDto: UpdateFloorDto) {
    return `This action updates a #${id} floor`;
  }

  remove(id: number) {
    return `This action removes a #${id} floor`;
  }
}

import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import { Repository } from 'typeorm';
import { responseOk } from 'utils';
import { FloorsService } from 'src/floors/floors.service';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private readonly repository: Repository<Building>,
    private readonly floorService: FloorsService
  ) { }

  async create(createBuildingDto: CreateBuildingDto) {
    try {
      const existingBuilding = await this.repository.findOne({ where: { name: createBuildingDto.name } });
      if (existingBuilding) {
        throw new ConflictException('El nombre del edificio ya está en uso');
      }
      const floors = createBuildingDto.floors;
      const building = this.repository.create({ name: createBuildingDto.name, address: createBuildingDto.address });
      const buildingCreated = await this.repository.save(building);
      await this.floorService.createBulk(buildingCreated, floors);
      return responseOk(buildingCreated); 
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all buildings`;
  }

  async findOne(buildingExternalId: string) {
    try {
      const building = await this.repository.find({ where: { externalId: buildingExternalId }, relations: ['workers', 'floors.sectors.units', 'garages'] })
      return responseOk(building);
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException();
    }
  }

  update(id: number, updateBuildingDto: UpdateBuildingDto) {
    return `This action updates a #${id} building`;
  }

  remove(id: number) {
    return `This action removes a #${id} building`;
  }

  async getByUser(userExternalId: string) {
    try {
      const buildings = await this.repository.find({ where: { users: { externalId: userExternalId } } });
      return responseOk(buildings)
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}

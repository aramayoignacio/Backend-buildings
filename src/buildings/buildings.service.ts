import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import { In, Repository } from 'typeorm';
import { responseOk } from 'utils';
import { FloorsService } from 'src/floors/floors.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private readonly repository: Repository<Building>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly floorService: FloorsService,
  ) { }

  async create(createBuildingDto: CreateBuildingDto) {
    try {
      const existingBuilding = await this.repository.findOne({ where: { name: createBuildingDto.name } });
      const users = createBuildingDto.userIds ? await this.userRepository.find({ where: { id: In(createBuildingDto.userIds) } }) : [];
      if (existingBuilding) {
        throw new ConflictException('El nombre del edificio ya está en uso');
      }
      const floors = createBuildingDto.floors;
      const building = this.repository.create({ name: createBuildingDto.name, address: createBuildingDto.address, users });
      const buildingCreated = await this.repository.save(building);
      await this.floorService.createBulk(buildingCreated, floors);
      return responseOk(buildingCreated);
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    const allBuildings = await this.repository.find();
    return responseOk(allBuildings);
  }

  async findOne(buildingExternalId: string) {
    try {
      const building = await this.repository.findOne({ where: { externalId: buildingExternalId }, 
        relations: ['workers', 'floors.sectors.units', 'garages', 'users'], 
        order: { floors: { numberInBuilding: 'ASC' } } });
      return responseOk(building);
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateBuildingDto: UpdateBuildingDto) {
    try {
      const building = await this.repository.findOne({ where: { id }, relations: ['users'] });
      const usersToAdd = await this.userRepository.find({ where: { id: In(updateBuildingDto.userIds) } });
      building.users = [...building.users, ...usersToAdd];
      building.name = updateBuildingDto.name;
      return responseOk(await this.repository.save(building));
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException();
    }
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

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sector } from './entities/sector.entity';
import { Repository } from 'typeorm';
import { Floor } from 'src/floors/entities/floor.entity';
import { responseOk } from 'utils';

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(Sector)
    private readonly repository: Repository<Sector>,
    @InjectRepository(Floor)
    private readonly floorRepository: Repository<Floor>,
  ) {}

  async create(createSectorDto: CreateSectorDto) {
    try {
      const floor = await this.floorRepository.findOne({
        where: { id: createSectorDto.floorId },
      });
      const sector = this.repository.create({
        name: createSectorDto.name,
        floor,
      });
      return responseOk(await this.repository.save(sector));
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return responseOk(await this.repository.find());
  }

  async findAllByBuilding(id: number) {
    return responseOk(
      await this.repository.find({
        relations: ['floor'],
        where: { floor: { building: { id } } },
      }),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} sector`;
  }

  update(id: number, updateSectorDto: UpdateSectorDto) {
    return `This action updates a #${id} sector`;
  }

  remove(id: number) {
    return `This action removes a #${id} sector`;
  }
}

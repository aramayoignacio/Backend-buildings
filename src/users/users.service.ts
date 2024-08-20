import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { responseOk } from 'utils';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Building } from 'src/buildings/entities/building.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>
  ) { }

  private saltOrRounds = 10;

  async create(createUserDto: CreateUserDto) {
    try {
      const { username, password } = createUserDto;
      const existingUser = await this.userRepository.findOne({ where: { username } });
      const buildings = createUserDto.buildingIds ? await this.buildingRepository.find({ where: { id: In(createUserDto.buildingIds) } }) : [];
      if (existingUser) {
        throw new ConflictException('El nombre de usuario ya está en uso');
      }
      const hashedPassword = await bcrypt.hash(password, this.saltOrRounds);
      const userObj = this.userRepository.create({ username, password: hashedPassword, isAdmin: false, buildings });
      const createdUser = await this.userRepository.save(userObj);
      return responseOk(createdUser);
    } catch (error) {
      throw new Error('Error al crear el usuario: ' + error);
    }
  }

  async findAll() {
    return responseOk(await this.userRepository.find());
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { responseOk } from 'utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  private saltOrRounds = 10;
  private users = []

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('El nombre de usuario ya está en uso');
    }
    const hashedPassword = await bcrypt.hash(password, this.saltOrRounds);
    const userObj = this.userRepository.create({ username, password: hashedPassword, isAdmin: false });
    try {
      const createdUser = await this.userRepository.save(userObj);
      return responseOk(createdUser);
    } catch (error) {
      throw new Error('Error al crear el usuario');
    }
  }

  findAll() {
    return `This action returns all users`;
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

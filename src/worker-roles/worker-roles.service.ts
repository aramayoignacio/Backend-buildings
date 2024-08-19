import { Injectable } from '@nestjs/common';
import { CreateWorkerRoleDto } from './dto/create-worker-role.dto';
import { UpdateWorkerRoleDto } from './dto/update-worker-role.dto';

@Injectable()
export class WorkerRolesService {
  create(createWorkerRoleDto: CreateWorkerRoleDto) {
    return 'This action adds a new workerRole';
  }

  findAll() {
    return `This action returns all workerRoles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workerRole`;
  }

  update(id: number, updateWorkerRoleDto: UpdateWorkerRoleDto) {
    return `This action updates a #${id} workerRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} workerRole`;
  }
}

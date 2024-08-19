import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkerRolesService } from './worker-roles.service';
import { CreateWorkerRoleDto } from './dto/create-worker-role.dto';
import { UpdateWorkerRoleDto } from './dto/update-worker-role.dto';

@Controller('worker-roles')
export class WorkerRolesController {
  constructor(private readonly workerRolesService: WorkerRolesService) {}

  @Post()
  create(@Body() createWorkerRoleDto: CreateWorkerRoleDto) {
    return this.workerRolesService.create(createWorkerRoleDto);
  }

  @Get()
  findAll() {
    return this.workerRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workerRolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkerRoleDto: UpdateWorkerRoleDto) {
    return this.workerRolesService.update(+id, updateWorkerRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workerRolesService.remove(+id);
  }
}

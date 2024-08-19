import { Module } from '@nestjs/common';
import { WorkerRolesService } from './worker-roles.service';
import { WorkerRolesController } from './worker-roles.controller';

@Module({
  controllers: [WorkerRolesController],
  providers: [WorkerRolesService],
})
export class WorkerRolesModule {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkerRoleDto } from './create-worker-role.dto';

export class UpdateWorkerRoleDto extends PartialType(CreateWorkerRoleDto) {}

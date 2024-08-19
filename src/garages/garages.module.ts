import { Module } from '@nestjs/common';
import { GaragesService } from './garages.service';
import { GaragesController } from './garages.controller';

@Module({
  controllers: [GaragesController],
  providers: [GaragesService],
})
export class GaragesModule {}

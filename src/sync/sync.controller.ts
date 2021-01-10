import { Controller, Get, Post } from '@nestjs/common';
import { SyncService } from './sync.service';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post()
  syncPipedriveToBling() {
    return this.syncService.syncPipedriveToBling();
  }

  @Get()
  getSyncData() {
    return this.syncService.getSyncData();
  }
}

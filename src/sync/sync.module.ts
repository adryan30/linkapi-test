import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlingModule } from 'src/bling/bling.module';
import { PipedriveModule } from 'src/pipedrive/pipedrive.module';
import { Sync, SyncSchema } from './schemas/sync.schema';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sync.name, schema: SyncSchema }]),
    PipedriveModule,
    BlingModule,
  ],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}

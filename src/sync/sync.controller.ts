import { Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SyncService } from './sync.service';

@ApiTags('sync')
@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @ApiOperation({ description: 'Aciona a integração Pipedrive-Bling' })
  @ApiCreatedResponse({ description: 'Sincronização realizada com sucesso' })
  @ApiBadRequestResponse({ description: 'Ocorreu algo errado ao sincronizar' })
  @Post()
  syncPipedriveToBling() {
    return this.syncService.syncPipedriveToBling();
  }

  @ApiOperation({
    description: 'Consolida todos os registros de sincronização do MongoDB',
  })
  @ApiOkResponse({ description: 'Retorna os documentos do MongoDB' })
  @Get()
  getSyncData() {
    return this.syncService.getSyncData();
  }
}

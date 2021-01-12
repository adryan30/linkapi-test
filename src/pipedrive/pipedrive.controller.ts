import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PipedriveService } from './pipedrive.service';
@ApiTags('pipedrive')
@Controller('pipedrive')
export class PipedriveController {
  constructor(private readonly pipedriveService: PipedriveService) {}

  @ApiOperation({
    description: 'Retorna todos os negócios "ganhos" do Pipedrive',
  })
  @Get()
  getWonDeals() {
    return this.pipedriveService.getWonDeals();
  }

  @ApiOperation({
    description:
      'Retorna todos os produtos de um negócio específico do Pipedrive',
  })
  @Get(':deal')
  getDealProducts(@Param('deal') deal: number) {
    return this.pipedriveService.getDealProducts(deal);
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { PipedriveService } from './pipedrive.service';

@Controller('pipedrive')
export class PipedriveController {
  constructor(private readonly pipedriveService: PipedriveService) {}

  @Get()
  getWonDeals() {
    return this.pipedriveService.getWonDeals();
  }

  @Get(':deal')
  getDealProducts(@Param('deal') deal: number) {
    return this.pipedriveService.getDealProducts(deal);
  }
}

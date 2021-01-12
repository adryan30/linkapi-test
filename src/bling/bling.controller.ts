import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PedidoBling } from 'src/shared/bling.interface';
import { BlingService } from './bling.service';

@Controller('bling')
export class BlingController {
  constructor(private readonly blingService: BlingService) {}
  @Post()
  createNewOrder(@Body() order: PedidoBling) {
    return this.blingService.postOrder(order);
  }
}

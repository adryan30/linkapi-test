import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PedidoBlingDto } from 'src/shared/bling.dto';
import { BlingService } from './bling.service';

@ApiTags('bling')
@Controller('bling')
export class BlingController {
  constructor(private readonly blingService: BlingService) {}

  @ApiOkResponse({ description: 'Todos os produtos cadastrados no Bling' })
  @ApiOperation({ description: 'Lista todos os produtos no serviço Bling' })
  @Get()
  listProducts() {
    return this.blingService.listProducts();
  }

  @ApiCreatedResponse({
    description: 'O pedido foi criado com sucesso',
  })
  @ApiInternalServerErrorResponse({
    description: 'Ocorreu um erro interno',
  })
  @ApiOperation({ description: 'Cria um novo pedido no serviço Bling' })
  @Post()
  createNewOrder(@Body() order: PedidoBlingDto) {
    return this.blingService.postOrder(order);
  }
}

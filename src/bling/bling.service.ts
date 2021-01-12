import { HttpService, Injectable, Logger } from '@nestjs/common';
import * as xml from 'fast-xml-parser';
import { PedidoBlingDto } from 'src/shared/bling.dto';

@Injectable()
export class BlingService {
  logger = new Logger(BlingService.name);
  parser: xml.j2xParser;

  constructor(private readonly httpService: HttpService) {
    this.parser = new xml.j2xParser(undefined);
  }

  /** Lista os produtos registrados no Bling */
  async listProducts() {
    const endpoint = '/produtos';
    const response = await this.httpService.get(endpoint).toPromise();
    return xml.parse(response.data);
  }

  /** Posta um novo pedido de venda no Bling */
  async postOrder(order: PedidoBlingDto) {
    const endpoint = '/pedido/json/"';
    const xml = this.parser.parse(order);
    await this.httpService
      .post(endpoint, undefined, { params: { xml } })
      .toPromise();
  }
}

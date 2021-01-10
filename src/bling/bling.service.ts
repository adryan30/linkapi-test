import { HttpService, Injectable, Logger } from '@nestjs/common';
import * as xml from 'fast-xml-parser';
import { PedidoBling } from 'src/shared/bling.interface';

@Injectable()
export class BlingService {
  logger = new Logger(BlingService.name);
  parser: xml.j2xParser;

  constructor(private readonly httpService: HttpService) {
    this.parser = new xml.j2xParser(undefined);
  }

  async postOrder(order: PedidoBling) {
    const endpoint = '/pedido/json/"';
    const xml = this.parser.parse(order);
    await this.httpService
      .post(endpoint, undefined, { params: { xml } })
      .toPromise();
  }

  async listProducts() {
    const endpoint = '/produtos';
    const response = await this.httpService.get(endpoint).toPromise();
    return xml.parse(response.data);
  }
}

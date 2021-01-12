import { HttpService, Injectable, Logger } from '@nestjs/common';
import { DealProductsResponse, DealsResponse } from 'src/shared/pipedrive.dto';

@Injectable()
export class PipedriveService {
  logger = new Logger(PipedriveService.name);
  endpoint = '/deals';

  constructor(private readonly httpService: HttpService) {}

  /** Busca os negócios com status "ganho" no Pipedrive */
  async getWonDeals(): Promise<DealsResponse> {
    const response = await this.httpService
      .get(this.endpoint, { params: { status: 'won' } })
      .toPromise();
    return response.data;
  }

  /** Busca os produtos relacionados a um negócio específico no Pipedrive */
  async getDealProducts(dealId: number): Promise<DealProductsResponse> {
    const endpoint = `${this.endpoint}/${dealId}/products`;
    const response = await this.httpService.get(endpoint).toPromise();
    return response.data;
  }
}

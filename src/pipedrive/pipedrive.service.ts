import { HttpService, Injectable, Logger } from '@nestjs/common';
import {
  DealProductsResponse,
  DealsResponse,
} from 'src/shared/pipedrive.interface';

@Injectable()
export class PipedriveService {
  logger = new Logger(PipedriveService.name);
  endpoint = '/deals';

  constructor(private readonly httpService: HttpService) {}

  async getWonDeals(): Promise<DealsResponse> {
    const response = await this.httpService
      .get(this.endpoint, { params: { status: 'won' } })
      .toPromise();
    return response.data;
  }

  async getDealProducts(dealId: number): Promise<DealProductsResponse> {
    const endpoint = `${this.endpoint}/${dealId}/products`;
    const response = await this.httpService.get(endpoint).toPromise();
    return response.data;
  }
}

import { HttpService, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PipedriveService {
  logger = new Logger(PipedriveService.name);
  endpoint = '/deals';

  constructor(private readonly httpService: HttpService) {}

  async getWonDeals() {
    const response = await this.httpService
      .get(this.endpoint, { params: { status: 'won' } })
      .toPromise();
    return response.data;
  }

  async getDealProducts(dealId: string) {
    const endpoint = `${this.endpoint}/${dealId}/products`;
    const response = await this.httpService.get(endpoint).toPromise();
    return response.data;
  }
}

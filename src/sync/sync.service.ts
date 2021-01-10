import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { parse } from 'date-fns';
import { create } from 'domain';
import { Model } from 'mongoose';
import { Deals as Deal } from 'src/shared/pipedrive.interface';
import { BlingService } from '../bling/bling.service';
import { PipedriveService } from '../pipedrive/pipedrive.service';
import { Sync, SyncDocument } from './schemas/sync.schema';

@Injectable()
export class SyncService {
  logger = new Logger(SyncService.name);
  constructor(
    private readonly pipedriveService: PipedriveService,
    private readonly blingService: BlingService,
    private readonly configService: ConfigService,
    @InjectModel(Sync.name) private readonly syncModel: Model<SyncDocument>,
  ) {}

  async syncPipedriveToBling() {
    const wonDeals = (await this.pipedriveService.getWonDeals()).data;
    const blingInserts = this.insertIntoBling(wonDeals);
    const mongoInserts = this.insertIntoMongo(wonDeals);
    await Promise.all(blingInserts).catch((error) => {
      throw new HttpException(
        { message: 'Houve uma falha ao inserir no Bling', error },
        400,
      );
    });
    await Promise.all(mongoInserts).catch((error) => {
      throw new HttpException(
        { message: 'Houve uma falha ao inserir no Mongo', error },
        400,
      );
    });
    return { message: 'Sincronizado com sucesso' };
  }

  insertIntoBling(wonDeals: Deal[]): Promise<void>[] {
    return wonDeals.map(async (deal) => {
      const itensForDeal = (
        await this.pipedriveService.getDealProducts(deal.id)
      ).data;
      return this.blingService.postOrder({
        pedido: {
          cliente: {
            nome: deal.person_name,
          },
          itens: {
            item: itensForDeal.map((item) => {
              return {
                codigo: this.configService.get('BLING_PRODUCT_CODE'),
                descricao: item.name,
                qtde: item.quantity,
                vlr_unit: item.item_price,
              };
            }),
          },
        },
      });
    });
  }

  insertIntoMongo(wonDeals: Deal[]) {
    const mongoInserts = [];
    const organizedDates = new Map<string, number>();
    wonDeals
      .map((deal) => {
        return {
          date: parse(
            deal.won_time.slice(0, 10),
            'yyyy-MM-dd',
            new Date(),
          ).toISOString(),
          totalValue: deal.value,
        };
      })
      .forEach((insert) => {
        organizedDates.has(insert.date)
          ? organizedDates.set(
              insert.date,
              organizedDates.get(insert.date) + insert.totalValue,
            )
          : organizedDates.set(insert.date, insert.totalValue);
      });
    organizedDates.forEach((value, key) => {
      mongoInserts.push(
        this.syncModel.updateOne(
          { date: new Date(key) },
          { totalValue: value },
          { upsert: true },
        ),
      );
    });
    return mongoInserts;
  }

  getSyncData() {
    return this.syncModel.find().sort([['date', 'desc']]);
  }
}

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { parse } from 'date-fns';
import { Model } from 'mongoose';
import { Deals as Deal } from 'src/shared/pipedrive.dto';
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

  /**
   * Método principal para a sincronização Pipedrive-Bling
   */
  async syncPipedriveToBling() {
    // Busca os négocios ganhos no Pipedrive
    const wonDeals = (await this.pipedriveService.getWonDeals()).data;
    // Cria inserções para Bling e MongoDB
    const blingInserts = this.insertIntoBling(wonDeals);
    const mongoInserts = this.insertIntoMongo(wonDeals);
    // Consolida as requisições de inserção
    await Promise.all(blingInserts).catch((error) => {
      throw new BadRequestException({
        message: 'Houve uma falha ao inserir no Bling',
        error,
      });
    });
    await Promise.all(mongoInserts).catch((error) => {
      throw new BadRequestException({
        message: 'Houve uma falha ao inserir no Mongo',
        error,
      });
    });
    return { message: 'Sincronizado com sucesso' };
  }

  /**
   * Método para inserção dos pedidos no Bling
   * @param wonDeals Negócios "ganhos" registrados no Pipedrive
   */
  insertIntoBling(wonDeals: Deal[]): Promise<void>[] {
    // Itera sobre cada pedido do Pipedrive para inserção no Bling
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

  /**
   * Método para inserção dos pedidos no MongoDB
   * @param wonDeals Negócios "ganhos" registrados no Pipedrive
   */
  insertIntoMongo(wonDeals: Deal[]) {
    const mongoInserts = [];
    const organizedDates = new Map<string, number>();
    // Consolida todos os négocios e seus valores por data
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
    // Cria objetos para inserção no Mongo
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

  /** Método que busca no MongoDB as sincronização, ordenando por data em ordem decrescente */
  getSyncData() {
    return this.syncModel.find().sort([['date', 'desc']]);
  }
}

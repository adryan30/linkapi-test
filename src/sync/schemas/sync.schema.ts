import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SyncDocument = Sync & Document;

/**
 * Schema para o armazenamento de registros de sincronização no MongoDB
 */
@Schema()
export class Sync {
  @Prop()
  date: Date;

  @Prop()
  totalValue: number;
}

export const SyncSchema = SchemaFactory.createForClass(Sync);

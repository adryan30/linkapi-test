import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SyncDocument = Sync & Document;

@Schema()
export class Sync {
  @Prop()
  date: Date;

  @Prop()
  totalValue: number;
}

export const SyncSchema = SchemaFactory.createForClass(Sync);

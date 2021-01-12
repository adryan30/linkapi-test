import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlingController } from './bling.controller';
import { BlingService } from './bling.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: 'https://bling.com.br/Api/v2',
        params: {
          apikey: configService.get<string>('BLING_API_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [BlingController],
  providers: [BlingService],
  exports: [BlingService],
})
export class BlingModule {}

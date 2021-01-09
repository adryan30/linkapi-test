import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PipedriveController } from './pipedrive.controller';
import { PipedriveService } from './pipedrive.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('PIPEDRIVE_API'),
        params: {
          api_token: configService.get<string>('PIPEDRIVE_API_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PipedriveController],
  providers: [PipedriveService],
})
export class PipedriveModule {}

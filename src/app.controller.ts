import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getApiKeys() {
    return { message: 'Hello World' };
  }
}

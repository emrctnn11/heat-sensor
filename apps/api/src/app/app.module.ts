import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesService } from './devices/devices.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DevicesService],
})
export class AppModule {}

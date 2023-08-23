import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesService } from './devices/devices.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true, // Generates schema from your types and resolvers
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DevicesService],
})
export class AppModule { }

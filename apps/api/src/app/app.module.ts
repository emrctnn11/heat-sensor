import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { resolvers } from './app-resolvers';
import { CqrsModule } from '@nestjs/cqrs';
import { SensorCqrsModule } from '@heat-sensor/api/cqrs';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmEntities } from '@heat-sensor/entities';
import { typeOrmConfig } from '@heat-sensor/constants';

@Module({
  imports: [TypeOrmModule.forRoot({
    ...typeOrmConfig.postgres,
    entities: [...typeOrmEntities],
  } as TypeOrmModuleOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
    CqrsModule,
    SensorCqrsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...resolvers],
})
export class AppModule { }

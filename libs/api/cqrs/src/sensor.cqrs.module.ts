
import { Module } from "@nestjs/common";
import { CqrsModule as NestCqrsModule } from "@nestjs/cqrs";
import { cqrsQueryHandlers } from "./queries";
import { DatabaseServiceModule } from "@heat-sensor/database-services";

@Module({
  imports: [NestCqrsModule, DatabaseServiceModule],
  providers: [...cqrsQueryHandlers],
  exports: [...cqrsQueryHandlers],
})
export class SensorCqrsModule { }

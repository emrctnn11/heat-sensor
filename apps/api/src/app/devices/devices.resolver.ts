import { DeviceHeatSensorObjectType } from '@heat-sensor/api/models';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Query } from '@nestjs/graphql';
import { DeviceHeatSensorQuery } from '@heat-sensor/api/cqrs';

export class AdminCustomerResolver {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Query(
    (payload) =>
    DeviceHeatSensorObjectType
  )
  async DeviceHeatSensor(
    @Args('id') id: number
  ) {
    return await this.queryBus.execute(
      new DeviceHeatSensorQuery(
        id
      )
    );
  }

}

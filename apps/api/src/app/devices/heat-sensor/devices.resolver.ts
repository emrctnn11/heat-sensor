import { DeviceHeatSensorObjectType } from '@heat-sensor/api/models';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { DeviceHeatSensorQuery } from '@heat-sensor/api/cqrs';

@Resolver()
export class DeviceResolver {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

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



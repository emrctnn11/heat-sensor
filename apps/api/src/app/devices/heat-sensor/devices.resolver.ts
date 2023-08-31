import { DeviceHeatSensorObjectType } from '@heat-sensor/api/models';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AllDevicesQuery } from '@heat-sensor/api/cqrs';

@Resolver()
export class DeviceResolver {
  constructor(
    private readonly queryBus: QueryBus,
  ) { }

  @Query(
    (payload) =>
      DeviceHeatSensorObjectType
  )
  async DeviceHeatSensor(
    @Args('id', { nullable: true }) id: string
  ) {
    console.log('DeviceResolver - DeviceHeatSensor query triggered with id:');
    return await this.queryBus.execute(
      new AllDevicesQuery(id)
    );
  }
}



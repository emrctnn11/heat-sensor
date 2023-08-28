import { DeviceHeatSensorObjectType } from '@heat-sensor/api/models';
import { QueryBus } from '@nestjs/cqrs';
import { Query, Resolver } from '@nestjs/graphql'; // Remove Args import
import { AllDevicesQuery } from '@heat-sensor/api/cqrs'; // Import the new query

@Resolver()
export class DeviceResolver {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Query((returns) => [DeviceHeatSensorObjectType]) // Return an array
  async AllDevices() { // Change the query name
    console.log('DeviceResolver - AllDevices query triggered'); // Update log message
    return await this.queryBus.execute(new AllDevicesQuery());
  }
}

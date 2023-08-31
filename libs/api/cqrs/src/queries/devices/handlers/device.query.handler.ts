import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DeviceHeatSensorDatabaseService } from '@heat-sensor/database-services';
import { AllDevicesQuery } from '../impl';

@QueryHandler(AllDevicesQuery)
export class AllDevicesQueryHandler
  implements IQueryHandler<AllDevicesQuery> {
  constructor(
    private readonly service: DeviceHeatSensorDatabaseService,
  ) {
    console.log('DeviceHeatSensorHandler');
  }

  async execute(query: AllDevicesQuery) {
    console.log('DeviceHeatSensorHandler - Handling query for id:', query);
    const recordsInDb = await this.service.getDevices();
    return recordsInDb;
  }
}

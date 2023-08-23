import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DeviceHeatSensorQuery } from '../impl';
import { DeviceHeatSensorDatabaseService } from '@heat-sensor/database-services';

@QueryHandler(DeviceHeatSensorQuery)
export class DeviceHeatSensorHandler
  implements IQueryHandler<DeviceHeatSensorQuery> {
  constructor(
    private readonly service: DeviceHeatSensorDatabaseService,
  ) {
    console.log('DeviceHeatSensorHandler');
  }

  async execute(query: DeviceHeatSensorQuery) {
    const { id } = query;
    const recordsInDb = await this.service.getDevice(
      id,
    );
    return recordsInDb;
  }
}

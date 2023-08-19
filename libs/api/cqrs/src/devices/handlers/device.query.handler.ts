import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DeviceHeatSensorQuery } from '../impl';

@QueryHandler(DeviceHeatSensorQuery)
export class DeviceHeatSensorHandler
  implements IQueryHandler<DeviceHeatSensorQuery> {
  constructor() {
    console.log('DeviceHeatSensorHandler');
  }

  async execute(query: DeviceHeatSensorQuery) {
    return {};
  }
}

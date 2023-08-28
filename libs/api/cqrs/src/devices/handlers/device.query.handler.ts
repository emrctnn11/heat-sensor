import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AllDevicesQuery } from '../impl'; // Import the new query
import { DeviceHeatSensorDatabaseService } from '@heat-sensor/database-services';
import { DeviceHeatSensorObjectType } from '@heat-sensor/api/models'; // Import the model

@QueryHandler(AllDevicesQuery) // Use the new query class
export class AllDevicesHandler implements IQueryHandler<AllDevicesQuery> {
  constructor(
    private readonly service: DeviceHeatSensorDatabaseService,
  ) {}

  async execute(query: AllDevicesQuery) { // Use the new query class
    console.log('AllDevicesHandler - Handling AllDevices query'); // Update log message
    const recordsInDb = await this.service.findAll(); // Fetch all devices
    return recordsInDb;
  }
}

import { Injectable } from "@nestjs/common";

@Injectable()
export class DeviceHeatSensorDatabaseService {
  constructor() {
    console.log('DeviceHeatSensorDatabaseService');
  }

  getDevice = async (id: number) => {
    console.log('DeviceHeatSensorDatabaseService.getDevice');
    return {
      id: id,
    }
  }
}

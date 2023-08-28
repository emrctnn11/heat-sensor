import { DeviceHeatSensorObjectType } from "@heat-sensor/api/models";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class DeviceHeatSensorDatabaseService {
  constructor(
    @InjectRepository(DeviceHeatSensorObjectType)
    private readonly deviceHeatSensorRepository: Repository<DeviceHeatSensorObjectType>,
  ) {
    console.log('DeviceHeatSensorDatabaseService');
  }

  async findAll(): Promise<DeviceHeatSensorObjectType[]> {
    return this.deviceHeatSensorRepository.find();
  }
}

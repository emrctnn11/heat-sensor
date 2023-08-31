import { DevicesEntity } from "@heat-sensor/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";

@Injectable()
export class DeviceHeatSensorDatabaseService {
  constructor(
    @InjectRepository(DevicesEntity)
    private readonly deviceHeatSensorRepository: Repository<DevicesEntity>,
  ) {
    console.log('DeviceHeatSensorDatabaseService');
  }

  getDevices = async () => {
    return await this.deviceHeatSensorRepository.find();
  }
}

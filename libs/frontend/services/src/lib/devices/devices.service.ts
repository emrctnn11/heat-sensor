import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DeviceHeatSensorObjectType, AllDevices_QueryGQL} from 'libs/frontend/src/angular-graphql';

@Injectable()
export class DeviceService {
  constructor(
    private readonly deviceQuery: AllDevices_QueryGQL,
  ) {

  }

  getDevices(): Observable<DeviceHeatSensorObjectType> {
    return this.deviceQuery.watch().valueChanges.pipe(
      map((res: any) => {
        console.log('DeviceService - Query response:', res);
        return res.data.DeviceHeatSensor?.[0];
      })
    );
  }


}

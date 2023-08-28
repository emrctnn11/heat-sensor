import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DeviceHeatSensorObjectType } from 'libs/frontend/src/angular-graphql';
import { DeviceService } from 'libs/frontend/services/src/lib/devices/devices.service';

@Component({
  selector: 'heat-sensor-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {

  devices$: Observable<DeviceHeatSensorObjectType> | undefined;


  constructor(
    private readonly deviceService: DeviceService,
  ) {
    this.devices$ = this.deviceService.getDevices()
  }
}

import { Component } from '@angular/core';
import { DeviceHeatSensorObjectType } from '@heat-sensor/api/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'heat-sensor-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {

  devicesSensor$: Observable<DeviceHeatSensorObjectType>;

  constructor() {
    console.log('HomePageComponent');

    // this.devicesSensor$ = this
  }
}

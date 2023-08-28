import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { DeviceService } from 'libs/frontend/services/src/lib/devices/devices.service';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule,],
  exports: [HomePageComponent],
  providers: [DeviceService],
})
export class PagesModule {}

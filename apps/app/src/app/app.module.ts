import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { PagesModule } from './pages/pages.module';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ApolloModule } from 'libs/frontend/common/src/apollo.module';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, PagesModule, ApolloModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

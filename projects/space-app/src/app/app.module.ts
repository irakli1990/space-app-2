import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedLibModule } from 'projects/shared-lib/src/public-api';
import { LaunchesListComponent } from './modules/launches/components/launches-list/launches-list.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, LaunchesListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedLibModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

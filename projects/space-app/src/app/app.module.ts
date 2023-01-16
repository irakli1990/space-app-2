import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { A2sCommModule } from 'a2s-comm';
import { Observable } from 'rxjs';
import { SharedLibModule } from 'shared-lib';
import { AppConfigService } from 'space-api/services';
import { API_URL } from 'space-api/tokens';
import { AppConfig } from 'space-api/types';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './views/start/start.component';

function appConfigInitializer(
  appConfigService: AppConfigService
): () => Observable<AppConfig> {
  return () => appConfigService.getAppConfig();
}

@NgModule({
  declarations: [AppComponent, StartComponent],
  imports: [
    A2sCommModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedLibModule,
  ],
  providers: [
    { provide: API_URL, useValue: environment.apiUrl },
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigInitializer,
      deps: [AppConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

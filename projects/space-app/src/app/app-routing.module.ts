import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './views/start/start.component';

const routes: Routes = [
  {
    path: 'start',
    component: StartComponent,
  },
  {
    path: 'launches',
    loadChildren: () =>
      import('./modules/launches/launches.module').then(
        (module) => module.LaunchesModule
      ),
  },
  {
    path: '**',
    redirectTo: 'start',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

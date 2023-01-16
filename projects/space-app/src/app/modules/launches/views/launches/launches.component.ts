import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Launch,
  LaunchDetailsUpdate,
  LaunchesQueryParams,
} from 'space-api/types';
import { LaunchesStateService } from './launches-state.service';

@Component({
  selector: 'app-launches',
  providers: [LaunchesStateService],
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss'],
})
export class LaunchesComponent {
  queryParams$: Observable<LaunchesQueryParams>;
  launches$: Observable<Launch[]>;

  constructor(private launchStateService: LaunchesStateService) {
    this.queryParams$ = this.launchStateService.queryParams;
    this.launches$ = this.launchStateService.launches;
  }

  searchLaunches(params: LaunchesQueryParams): void {
    this.launchStateService.searchLaunches(params);
  }
  updateLaunchDetails(detailsUpdate: LaunchDetailsUpdate): void {
    this.launchStateService.updateLaunchDetails(detailsUpdate);
  }
}

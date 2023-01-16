import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { LaunchesService } from 'space-api/services';
import {
  Launch,
  LaunchDetailsUpdate,
  LaunchesQueryParams,
} from 'space-api/types';

@Injectable()
export class LaunchesStateService {
  private refresh = new Subject<void>();

  queryParams: Observable<LaunchesQueryParams>;
  launches: Observable<Launch[]>;

  constructor(
    private launchesService: LaunchesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.queryParams = this.route
      .queryParams as Observable<LaunchesQueryParams>;

    this.launches = combineLatest([
      this.queryParams,
      this.refresh.pipe(startWith(undefined)),
    ]).pipe(
      switchMap(([queryParams]) =>
        this.launchesService.getLaunches(queryParams)
      )
    );

    console.log(this.launches);
  }

  searchLaunches(params: Partial<LaunchesQueryParams>): void {
    this.router.navigate(['.'], {
      queryParams: params,
      relativeTo: this.route,
    });
  }

  refreshLaunches(): void {
    this.refresh.next();
  }

  updateLaunchDetails(detailsUpdate: LaunchDetailsUpdate): void {
    this.launchesService
      .updateDetails(detailsUpdate)
      .subscribe(() => this.refreshLaunches());
  }
}

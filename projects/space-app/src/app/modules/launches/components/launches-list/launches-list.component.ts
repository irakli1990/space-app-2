import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Launch, LaunchDetailsUpdate } from 'space-api/types';

@Component({
  selector: 'app-launches-list',
  templateUrl: './launches-list.component.html',
  styleUrls: ['./launches-list.component.scss'],
})
export class LaunchesListComponent implements OnInit {
  @Input() launches!: Launch[];

  constructor() {}

  ngOnInit(): void {}

  @Output() launchDetailsUpdate = new EventEmitter<LaunchDetailsUpdate>();

  updateDetails(launch: Launch, $event: string): void {
    this.launchDetailsUpdate.emit({ id: launch.id, details: $event });
  }
}

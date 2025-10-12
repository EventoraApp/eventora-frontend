import { Component, inject } from '@angular/core';
import { EventTable } from '../../../../components/table/table';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionSearch } from '@ng-icons/ionicons';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-list',
  imports: [EventTable, NgIcon, RouterLink],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss',
  viewProviders: [provideIcons({ionSearch})],
})
export class EventList {
  router = inject(Router)
}

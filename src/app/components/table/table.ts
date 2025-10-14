import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons, NgIcon } from '@ng-icons/core';
import {
  ionTrash,
  ionArrowUpRightBoxOutline,
  ionCreate,
} from '@ng-icons/ionicons';

export interface EventTableColumn {
  header: string;
  field: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgClass, NgIcon],
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
  viewProviders: [
    provideIcons({ ionTrash, ionArrowUpRightBoxOutline, ionCreate }),
  ],
})
export class EventTable {
  @Input() events: any[] = [];
  router = inject(Router);

  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onView(event: any) {
    this.view.emit(event);
  }

  onEdit(event: any) {
    this.edit.emit(event);
  }

  onDelete(event: any) {
    this.delete.emit(event);
  }
}

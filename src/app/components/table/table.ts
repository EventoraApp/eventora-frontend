import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { ionTrash ,ionArrowUpRightBoxOutline,ionCreate} from '@ng-icons/ionicons';

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
    provideIcons({ ionTrash,ionArrowUpRightBoxOutline,ionCreate}),
  ],
})
export class EventTable{
  @Input() events: any[] = [];
  router = inject(Router)

   onView(event: any) {
    console.log('View', event);
    this.router.navigate(['/dashboard/events/', event.name])
  }
  
  onEdit(event: any) {
    console.log('Edit', event);
    this.router.navigate(['/dashboard/events/',event.name,'edit'])
  }
  
  onDelete(event: any) {
    console.log('Delete', event);
  }
}

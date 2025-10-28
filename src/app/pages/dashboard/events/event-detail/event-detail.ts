import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule,Location  } from '@angular/common';
import { Events } from '../../../../services/events';
import { toast } from 'ngx-sonner';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { ionChevronBack,ionCreate ,ionLocationSharp,ionTrash} from '@ng-icons/ionicons';
import { EventStatsComponent } from "../../../../components/event-stats/event-stats";

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink, EventStatsComponent],
  templateUrl: './event-detail.html',
  styleUrls: ['./event-detail.scss'],
  viewProviders: provideIcons({
    ionChevronBack,ionCreate,ionTrash,ionLocationSharp
  })
})
export class EventDetail implements OnInit {
  event: any = null;
  event_info: any = null;
  loading = true;
  eventService = inject(Events)
  router =inject(Router)

  constructor(
    private route: ActivatedRoute,
     private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchEventDetails(id);
    }
  }

  fetchEventDetails(id: string) {
    this.eventService.getEventById(id).subscribe({
      next: (res) => {
        this.event = res;
        this.loading = false;
      },
      error: (err) => {
        toast.error('Error fetching event details:', err);
        this.loading = false;
      },
    });
    this.eventService.getEventInfo(id).subscribe({
      next: (res) => {
        this.event_info = res.data;
        console.log("Info",res)
      },
      error: (err) => {
        toast.error('Error fetching event info:', err);
      },
    });
  }

    goBack() {
    this.location.back();
  }

  togglePublishEvent(id: string) {
    this.eventService.togglePublishEvent(id).subscribe({
      next: (res)=> {
        console.log(res)
        toast.success(res.message)
        this.router.navigate(['/dashboard/events'])
      },
      error: (err) => {
        console.log(err)
        toast.error("Could'nt Publish this Event")
      }
    })
  }


    onEdit(event: any) {
    console.log('Edit event:', event);
    this.router.navigate(['/dashboard/events/', event.id, 'edit']);
  }
  
  onDelete(event: any) {
    if (confirm(`Are you sure you want to delete ${event.name}?`)) {
      this.eventService.deleteEvent(event.id).subscribe({
        next: () => {
          toast.success('Event Deleted successfully!');
          this.router.navigate(['/dashboard/events'])
        },
        error: (err) => {
          console.error('Delete failed', err);
          toast.error(' Delete failed!');
        },
      });
    }
  }
}

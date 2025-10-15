import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule,Location  } from '@angular/common';
import { Events } from '../../../../services/events';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail.html',
  styleUrls: ['./event-detail.scss'],
})
export class EventDetail implements OnInit {
  event: any = null;
  loading = true;
  eventService = inject(Events)

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
  }

    goBack() {
    this.location.back();
  }
}

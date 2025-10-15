import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '../../services/events';
import { toast } from 'ngx-sonner';
import { EventTable } from "../../components/table/table";

@Component({
  selector: 'app-find-event',
  imports: [EventTable],
  templateUrl: './find-event.html',
  styleUrl: './find-event.scss'
})
export class FindEvent implements OnInit {
router = inject(Router);
  private eventService = inject(Events);
  events: any[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadEvents();
  }
  
  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (res) => {
        this.events = res.map((event: any) => ({
          image: event.image || 'assets/images/default.jpg',
          name: event.title,
          location: event.location,
          date: event.event_date,
          time: event.event_time,
          status: event.is_published ? 'Published' : 'Draft',
          id: event.id,
          slug: event.slug,
        }));
        
        console.log(this.events)
        this.loading = false;
      },
      error: (err) => {
        toast.error('Error fetching events:', err);
        this.loading = false;
      },
    });
  }
}

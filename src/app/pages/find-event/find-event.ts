import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '../../services/events';
import { toast } from 'ngx-sonner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionSearch } from '@ng-icons/ionicons';

@Component({
  selector: 'app-find-event',
  imports: [NgIcon],
  templateUrl: './find-event.html',
  styleUrl: './find-event.scss',
  viewProviders: [
    provideIcons({
      ionSearch,
    }),
  ],
})
export class FindEvent implements OnInit {
  router = inject(Router);
  private eventService = inject(Events);
  events: any[] = [];
  loading = true;
  locations = ['Accra', 'Kumasi', 'Tema', 'Takoradi'];

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
          id: event.id,
          slug: event.slug,
        }));

        console.log(this.events);
        this.loading = false;
      },
      error: (err) => {
        toast.error('Error fetching events:', err);
        this.loading = false;
      },
    });
  }

  onSearch() {
    console.log('Search with filters:');
    // Navigate to search results with query params, e.g.:
    // this.router.navigate(['/events'], { queryParams: this.filters });
  }
}

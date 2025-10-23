import { Component, inject, OnInit } from '@angular/core';
import { EventTable } from '../../../../components/table/table';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionSearch } from '@ng-icons/ionicons';
import { Router, RouterLink } from '@angular/router';
import { Events } from '../../../../services/events';
import { toast } from 'ngx-sonner';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  imports: [EventTable, NgIcon,FormsModule, RouterLink],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss',
  viewProviders: [provideIcons({ ionSearch })],
})
export class EventList implements OnInit {
  router = inject(Router);
  private eventService = inject(Events);
  events: any[] = [];
  filteredEvents: any[] = [];
  searchText =""
  loading = true;

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getMyEvents().subscribe({
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

        this.filteredEvents = [...this.events]
        this.loading = false;
      },
      error: (err) => {
        toast.error('Error fetching events:', err);
        this.loading = false;
      },
    });
  }

  onView(event: any) {
    console.log('View event:', event);
    this.router.navigate(['/dashboard/events/', event.id]);
  }
  
  onEdit(event: any) {
    console.log('Edit event:', event);
    this.router.navigate(['/dashboard/events/', event.id, 'edit']);
  }

  onDelete(event: any) {
    if (confirm(`Are you sure you want to delete ${event.name}?`)) {
      this.eventService.deleteEvent(event.id).subscribe({
        next: () => {
          this.events = this.events.filter((e) => e.id !== event.id);
          toast.success('Event Deleted successfully!');
        },
        error: (err) => {
          console.error('Delete failed', err);
          toast.error(' Delete failed!');
        },
      });
    }
  }


  onSearchChange() {
    const search = this.searchText.toLowerCase().trim();
    if (!search) {
      this.filteredEvents = [...this.events];
      return;
    }

    this.filteredEvents = this.events.filter((event) =>
      event.name.toLowerCase().includes(search)
    );
  }

}

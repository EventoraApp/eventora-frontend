import { Component, inject, OnInit } from '@angular/core';
import { EventTable } from '../../../components/table/table';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionSearch } from '@ng-icons/ionicons';
import { Router, RouterLink } from '@angular/router';
import { Events } from '../../../services/events';
import { toast } from 'ngx-sonner';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  imports: [EventTable, NgIcon,FormsModule, RouterLink],
  templateUrl: './tickets.html',
  styleUrl: './tickets.scss',
  viewProviders: [provideIcons({ ionSearch })],
})
export class Tickets implements OnInit {
  router = inject(Router);
  private eventService = inject(Events);
  tickets: any[] = [];
  filteredEvents: any[] = [];
  searchText =""
  loading = true;

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getMyTickets().subscribe({
      next: (res) => {
        this.tickets = res

        this.filteredEvents = [...this.tickets]
        this.loading = false;
      },
      error: (err) => {
        toast.error('Error fetching tickets:', err);
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

  onDelete(ticket: any) {
    if (confirm(`Are you sure you want to delete ${ticket.name}?`)) {
      this.eventService.deleteEvent(ticket.id).subscribe({
        next: () => {
          this.tickets = this.tickets.filter((e) => e.id !== ticket.id);
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
      this.filteredEvents = [...this.tickets];
      return;
    }

    this.filteredEvents = this.tickets.filter((ticket) =>
      ticket.name.toLowerCase().includes(search)
    );
  }

}

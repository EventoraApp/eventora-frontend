import { Component, inject, OnInit } from '@angular/core'
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionSearch } from '@ng-icons/ionicons';
import { Router, RouterLink } from '@angular/router';
import { Events } from '../../../services/events';
import { toast } from 'ngx-sonner';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tickets',
  imports: [ NgIcon,FormsModule, RouterLink, NgClass],
  templateUrl: './tickets.html',
  styleUrl: './tickets.scss',
  viewProviders: [provideIcons({ ionSearch })],
})
export class Tickets implements OnInit {
  router = inject(Router);
  private eventService = inject(Events);
  tickets: any[] = [];
  filteredTickets: any[] = [];
  searchText =""
  loading = true;

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.eventService.getMyTickets().subscribe({
      next: (res) => {
        this.tickets = res
console.log(res)
        this.filteredTickets = [...this.tickets]
        this.loading = false;
      },
      error: (err) => {
        toast.error('Error fetching tickets:', err);
        this.loading = false;
      },
    });
  }

  onView(ticket: any) {
    console.log('View ticket:', ticket);
    this.router.navigate(['/register-event/', ticket.event]);
  }
  




  onSearchChange() {
    const search = this.searchText.toLowerCase().trim();
    if (!search) {
      this.filteredTickets = [...this.tickets];
      return;
    }

    this.filteredTickets = this.tickets.filter((ticket) =>
      ticket.event_title.toLowerCase().includes(search)
    );
  }

}

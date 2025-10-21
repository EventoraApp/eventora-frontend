import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Events } from '../../services/events';
import { toast } from 'ngx-sonner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  ionSearch,
  ionLocationSharp,
  ionTime,
  ionFilter,
} from '@ng-icons/ionicons';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-find-event',
  imports: [NgIcon, DatePipe, FormsModule],
  templateUrl: './find-event.html',
  styleUrl: './find-event.scss',
  viewProviders: [
    provideIcons({
      ionSearch,
      ionLocationSharp,
      ionTime,
      ionFilter,
    }),
  ],
})
export class FindEvent implements OnInit {


  router = inject(Router);
  private eventService = inject(Events);
  events: any[] = [];
  filteredEvents: any[] = [];
  loading = true;
  locations = ['Accra', 'Kumasi', 'Tema', 'Takoradi'];
  searchText = ""

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (res) => {
        this.events = res.map((event: any) => ({
          image: event.image || 'assets/images/laptopframe.png',
          name: event.title,
          location: event.location,
          date: event.event_date,
          time: event.event_time,
          description: event.description,
          price: event.price,
          category: event.category,
          id: event.id,
          slug: event.slug,
        }));
        this.filteredEvents = [...this.events]
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
    // this.router.navigate(['/find-event'], { queryParams: this.filters });
  }

  onSearchChange() {
    console.log(this.searchText, this.events)
    if (!this.searchText) {
      this.filteredEvents = [...this.events]
    } else {
      this.filteredEvents = this.events.filter((event) => {
        event.name.toLowerCase().includes(this.searchText.toLowerCase())
        
        console.log("Filtered main", this.filteredEvents,this.searchText.toLowerCase())
        console.log("Filtered", event.name.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()))
      })
    }
  }

  handleEventDetails(id: any) {
    this.router.navigate(['/register-event', id]);
  }
}

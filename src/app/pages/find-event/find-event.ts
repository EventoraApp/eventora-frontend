import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  route = inject(ActivatedRoute)
  allCategories: any = []
  router = inject(Router);
  private eventService = inject(Events);
  events: any[] = [];
  filteredEvents: any[] = [];
  loading = true;
  locations = ['Accra', 'Kumasi', 'Tema', 'Takoradi'];
  searchText = ""
  showCategoryMenu = false;
  selectedCategory: string | null = null;

  ngOnInit(): void {
    this.loadEvents();
    this.eventService.getCategories().subscribe({
      next: (res) => {
        this.allCategories = res
        console.log(res)
      },
      error: (err) => {
        toast.error("Couldn't load Categories")
        console.log(err)
      }
    })

    this.route.queryParams.subscribe(params => {
      const search = params['query']
      if (search) {
        this.searchText = search
        this.onSearchChange()
      }
    })
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (res) => {
        this.events = res.map((event: any) => ({
          image: event.image_url || 'assets/images/laptopframe.png',
          name: event.title,
          location: event.location,
          date: event.event_date,
          time: event.event_time,
          description: event.description,
          price: event.price,
          category: event.category_name,
          id: event.id,
          slug: event.slug,
        }));
        this.filteredEvents = [...this.events]
        this.loading = false;
        console.log(this.filteredEvents)
      },
      error: (err) => {
        toast.error('Error fetching events:', err);
        this.loading = false;
      },
    });
  }


  toggleCategoryMenu() {
    this.showCategoryMenu = !this.showCategoryMenu;
  }

  onSelectCategory(catId: string | null) {
    this.selectedCategory = catId;
    this.showCategoryMenu = false;

    if (!catId) {
      this.filteredEvents = [...this.events];
    } else {
      this.filterByCategory(catId);
    }
  }

  filterByCategory(catId: string) {
    this.filteredEvents = this.events.filter(event => event.category.id === catId);
  }

  filterByLocation(location: string | null) {
    if(!location){
      this.filteredEvents = [...this.events];
      return
    }
    this.filteredEvents = this.events.filter(event => event.location === location);
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


  handleEventDetails(id: any) {
    this.router.navigate(['/register-event', id]);
  }
}

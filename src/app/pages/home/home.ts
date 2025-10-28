import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  ionBriefcaseSharp,
  ionFastFood,
  ionFootball,
  ionHeadsetSharp,
  ionLaptopOutline,
  ionSearch,
} from '@ng-icons/ionicons';
import { AuthService } from '../../services/auth-service';
import { Events } from '../../services/events';
import { toast } from 'ngx-sonner';
import { FormsModule } from '@angular/forms';

interface EventItem {
  id: string;
  name: string;
  date: Date;
  location: string;
  image: string;
  shortDesc: string;
}
interface Testimonial {
  user: string;
  text: string;
}

@Component({
  selector: 'app-home',
  imports: [DatePipe, NgIcon, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  viewProviders: [
    provideIcons({
      ionSearch,
      ionHeadsetSharp,
      ionBriefcaseSharp,
      ionFastFood,
      ionLaptopOutline,
      ionFootball,
    }),
  ],
})
export class Home implements OnInit {
  authService = inject(AuthService);
  router = inject(Router)
  private eventService = inject(Events);
  events: any[] = [];


  user = {};
  carouselImages: string[] = [
    'assets/images/hero1.jpg',
    'assets/images/hero2.jpg',
    'assets/images/hero3.jpg',
  ];
  currentIndex = 0;

  locations = ['Accra', 'Kumasi', 'Tema', 'Takoradi'];
  categories = {
    ionHeadsetSharp: 'Music',
    ionLaptopOutline: 'Tech',
    ionFastFood: 'Food & Drink',
    ionFootball: 'Sports',
    ionBriefcaseSharp: 'Workshops',
  };
  categoryEntries = Object.entries(this.categories);

  trendingEvents: any = [
  ];

  testimonials: Testimonial[] = [
    {
      user: 'Jane Doe',
      text: 'I found amazing concerts here — so easy to book!',
    },
    {
      user: 'John Smith',
      text: 'Eventora helps me discover local events I never knew existed.',
    },
    {
      user: 'Mary Johnson',
      text: 'Great UX and beautiful design. Very intuitive!',
    },
    {
      user: 'John Smith',
      text: 'Eventora helps me discover local events I never knew existed.',
    },
  ];

  filters = {
    query: '',
    location: '',
    date: '',
    category: '',
  };

  ngOnInit(): void {
    this.startCarousel();
    this.loadEvents()
  }

  startCarousel() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
    }, 5000);
  }

  onSearch() {
    this.router.navigate(['/find-event'], { queryParams: this.filters });
  }

  browseCategory() {
    this.router.navigate(['/find-event'], { queryParams: this.filters });
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

        this.trendingEvents = this.events.slice(0, 4)
      },
      error: (err) => {
        toast.error('Error fetching events:', err);
      },
    });
  }
  handleEventDetails(id: any) {
    this.router.navigate(['/register-event', id]);
  }
}

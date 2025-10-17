import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  imports: [DatePipe, NgIcon],
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

  trendingEvents: EventItem[] = [
    {
      id: '1',
      name: 'Live Music Night',
      date: new Date('2025-11-10'),
      location: 'Accra',
      image: 'assets/images/music1.jpg',
      shortDesc: 'Enjoy a spectacular evening of local bands and DJs.',
    },
    {
      id: '2',
      name: 'Tech Summit',
      date: new Date('2025-12-05'),
      location: 'Kumasi',
      image: 'assets/images/tech1.jpg',
      shortDesc: 'Join innovators, network, and learn from industry leaders.',
    },
    {
      id: '3',
      name: 'Food Festival',
      date: new Date('2025-10-22'),
      location: 'Tema',
      image: 'assets/images/food1.jpg',
      shortDesc: 'Taste cuisines from around the world at one place.',
    },
    {
      id: '3',
      name: 'Code Fest 2025',
      date: new Date('2025-10-22'),
      location: 'Tema',
      image: 'assets/images/hack1.jpg',
      shortDesc: 'Taste cuisines from around the world at one place.',
    },
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
  }

  startCarousel() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
    }, 5000);
  }

  onSearch() {
    console.log('Search with filters:', this.filters);
    // Navigate to search results with query params, e.g.:
    // this.router.navigate(['/events'], { queryParams: this.filters });
  }

  goToEvent(id: string) {
    // navigate to event detail page
    // this.router.navigate(['/event', id]);
  }
}

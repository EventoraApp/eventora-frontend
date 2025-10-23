import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink ,NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';
import { provideIcons, NgIcon } from '@ng-icons/core';
import {
  ionHome,
  ionPersonCircleSharp,
  ionCalendarOutline,
  ionTicket
} from '@ng-icons/ionicons';

@Component({
  selector: 'app-side-bar',
  imports: [NgIcon, RouterLink, NgClass],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
  viewProviders: [
    provideIcons({ ionHome, ionPersonCircleSharp, ionCalendarOutline,ionTicket }),
  ],
})
export class SideBar implements OnInit {
  router = inject(Router);
  isHomeActive = false;
  isEventActive = false;
  isProfileActive = false;
  isTicketActive = false;

  ngOnInit(): void {
    this.updateActiveLinks(this.router.url); 

   
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updateActiveLinks(event.urlAfterRedirects);
      });
  }

  private updateActiveLinks(url: string): void {
    this.isHomeActive = url.includes('/dashboard/home');
    this.isEventActive = url.includes('/dashboard/events');
    this.isProfileActive = url.includes('/dashboard/profile');
    this.isTicketActive = url.includes('/dashboard/tickets');
  }
}
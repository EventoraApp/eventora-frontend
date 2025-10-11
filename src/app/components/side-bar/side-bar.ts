import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink ,NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';
import { provideIcons, NgIcon } from '@ng-icons/core';
import {
  ionHome,
  ionSettingsOutline,
  ionCalendarOutline,
} from '@ng-icons/ionicons';

@Component({
  selector: 'app-side-bar',
  imports: [NgIcon, RouterLink, NgClass],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
  viewProviders: [
    provideIcons({ ionHome, ionSettingsOutline, ionCalendarOutline }),
  ],
})
export class SideBar implements OnInit {
  router = inject(Router);
  isHomeActive = false;
  isEventActive = false;
  isSettingsActive = false;

  ngOnInit(): void {
    this.updateActiveLinks(this.router.url); // initial state

    // Listen to route changes
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updateActiveLinks(event.urlAfterRedirects);
      });
  }

  private updateActiveLinks(url: string): void {
    this.isHomeActive = url.includes('/dashboard/home');
    this.isEventActive = url.includes('/dashboard/events');
    this.isSettingsActive = url.includes('/dashboard/settings');
  }
}
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { ionMegaphone, ionGift } from '@ng-icons/ionicons';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink],
  templateUrl: './home.html',
  viewProviders: provideIcons({ ionMegaphone, ionGift }),
})
export class Home {
  authService = inject(AuthService);

  username = '';
  event = {
    title: 'Hackaton',
    date: 'Nov 16, 2025',
    status: 'On Sale',
    time: '10:00 AM',
    ticketsSold: 10,
    totalTickets: 100,
    image: 'assets/images/hack1.jpg',
  };

  constructor() {
    this.authService.getCurrentUser().subscribe({
      next: (res) => {
        this.username = res.username;
      },
      error: () => {
        console.log('Something went wrong!');
      },
    });
  }
}

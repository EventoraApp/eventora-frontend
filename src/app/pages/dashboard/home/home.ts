import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
})
export class Home {
  userName = 'Fynn';
  event = {
    title: 'Hackaton',
    date: 'Nov 16, 2025',
    status: 'On Sale',
    time: '10:00 AM',
    ticketsSold: 10,
    totalTickets: 100,
    image: 'assets/images/hack1.jpg',
  };
}

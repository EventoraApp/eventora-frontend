import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from '../../components/side-bar/side-bar';
import { DashNavbar } from '../../components/dash-navbar/dash-navbar';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SideBar, DashNavbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  authService = inject(AuthService);
  username = '';
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

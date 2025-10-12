import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dash-navbar',
  imports: [RouterLink],
  templateUrl: './dash-navbar.html',
  styleUrl: './dash-navbar.scss',
})
export class DashNavbar {
  router = inject(Router);
}

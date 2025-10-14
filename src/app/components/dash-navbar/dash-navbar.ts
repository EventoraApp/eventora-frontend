import { NgClass } from '@angular/common';
import { Component, inject, Input, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { AuthService } from '../../services/auth-service';
import { ionLogOutOutline } from '@ng-icons/ionicons';

@Component({
  selector: 'app-dash-navbar',
  imports: [RouterLink, NgClass, NgIcon],
  templateUrl: './dash-navbar.html',
  styleUrl: './dash-navbar.scss',
  viewProviders: provideIcons({
    ionLogOutOutline
  })
})
export class DashNavbar {
  authService = inject(AuthService);
  @Input() username: string = '';
  router = inject(Router);
  showMenu = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  handleLogOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

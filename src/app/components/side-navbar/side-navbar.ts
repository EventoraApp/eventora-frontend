import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { NgIcon } from "@ng-icons/core";

@Component({
  selector: 'app-side-navbar',
  imports: [RouterLink, NgIcon],
  templateUrl: './side-navbar.html',
  styleUrl: './side-navbar.scss',
})
export class SideNavbar {
  router = inject(Router)
  authService = inject(AuthService);
  user = {
    username: '',
    email: '',
    role: '',
    first_name: '',
    last_name: '',
  };

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.log(err, 'An error occurred');
        // alert('Couldnt get current user for some reasons');
      },
    });
  }

  handleLogOut() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}

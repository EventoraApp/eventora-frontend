import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { NgIcon } from "@ng-icons/core";
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-side-navbar',
  imports: [RouterLink, NgIcon],
  templateUrl: './side-navbar.html',
  styleUrl: './side-navbar.scss',
})
export class SideNavbar {
  router = inject(Router)
  authService = inject(AuthService);
  profile_pic = ""
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
        this.profile_pic = res.profile_picture
      },
      error: (err) => {
        console.log(err, 'An error occurred');
        toast.error('Couldnt get current user for some reasons');
      },
    });
  }

  handleLogOut() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}

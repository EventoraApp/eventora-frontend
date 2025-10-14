import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile implements OnInit {
  private authService = inject(AuthService);
  user: any;

  ngOnInit(): void {
    this.fetchCurrentUser();
  }

  fetchCurrentUser() {
    this.authService.getCurrentUser().subscribe({
      next: (res) => {
        console.log('User profile:', res);
        this.user = res;
      },
      error: (err) => {
        console.error('Failed to fetch user info:', err);
      }
    });
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionPersonOutline } from '@ng-icons/ionicons';
import { AuthService } from '../../../services/auth-service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  viewProviders: provideIcons({
    ionPersonOutline
  })
})
export class Profile implements OnInit {
  private authService = inject(AuthService);
  user: any;
  profileForm =  new FormGroup({

  })
  loading = false

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

  onSubmit() {
    
  }
}

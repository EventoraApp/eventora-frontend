import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  loading = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  async handleLogin() {
    this.loading = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService
      .loginUser({ username: 'Beans', password: password! })
      .subscribe({
        next: (res) => {
          console.log('Login successful:', res);
          this.authService.getCurrentUser().subscribe({
            next: (res) => {
              alert(`Welcome back, ${res.username}!`);

              this.loading = false;
    
              if (res.role === 'organizer') {
                this.router.navigate(['/dashboard/home']);
              } else if (res.role === 'attendee') {
                this.router.navigate(['/home']);
              } else {
                this.router.navigate(['/home']);
              }

            },
            error: () => {this.loading = false;
              console.log("Couldnt get User")
            },
          });

        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Invalid credentials. Please try again.');
          this.loading = false;
        },
      });
  }
}

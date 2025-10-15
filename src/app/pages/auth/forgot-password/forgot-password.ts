import { Component, inject } from '@angular/core';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [NgClass,ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  private authService = inject(AuthService);
  private router = inject(Router);
  loading = false;

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  async verify() {
    this.loading = true;
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    const { email } = this.forgotPasswordForm.value;

    // this.authService
    //   .loginUser({ email: email!, password: password! })
    //   .subscribe({
    //     next: (res) => {
    //       console.log('Login successful:', res);
    //       this.authService.getCurrentUser().subscribe({
    //         next: (res) => {
    //           toast.success(`Welcome back, ${res.username}!`);

    //           this.loading = false;

    //           if (res.role === 'organizer') {
    //             this.router.navigate(['/dashboard/home']);
    //           } else if (res.role === 'attendee') {
    //             this.router.navigate(['/home']);
    //           } else {
    //             this.router.navigate(['/home']);
    //           }
    //         },
    //         error: () => {
    //           this.loading = false;
    //           toast.error("Couldn't get User");
    //         },
    //       });
    //     },
    //     error: (err) => {
    //       console.error('Login failed:', err);
    //       toast.error('Invalid credentials. Please try again.');
    //       this.loading = false;
    //     },
    //   });
  }
}

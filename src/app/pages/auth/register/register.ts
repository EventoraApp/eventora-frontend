import { provideIcons } from '@ng-icons/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ionLogoGoogle,
  ionLogoFacebook,
  ionLogoApple,
} from '@ng-icons/ionicons';

import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  viewProviders: [
    provideIcons({ ionLogoGoogle, ionLogoFacebook, ionLogoApple }),
  ],
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);
  loading = false

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
    password_confirm: new FormControl('', [Validators.required]),
    role: new FormControl('organizer', [Validators.required]),
  });

  handleRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      alert('Provide inputs for the required fields')
      return;
    }
    this.loading = true
    
    const { firstName, lastName, email, password, password_confirm ,role } =
    this.registerForm.value;
    
    const registerData = {
      username: `${firstName}`,
      first_name:firstName,
      last_name:lastName,
      email: email,
      password: password,
      password_confirm: password_confirm,
      role: role,
    };

    this.authService.registerUser(registerData).subscribe({
      next: (res) => {
        console.log('Registration successful:', res);
        alert('Registration successful!');
        this.router.navigate(['/login']);
        this.loading = false
      },
      error: (err) => {
        console.error('Registration failed:', JSON.stringify(err.error));
        alert(`${JSON.stringify(err.error.username[0])}`);
        this.loading = false
      },
    });
  }
}

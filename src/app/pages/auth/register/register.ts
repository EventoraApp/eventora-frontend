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

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  viewProviders: [
    provideIcons({ ionLogoGoogle, ionLogoFacebook, ionLogoApple }),
  ],
})
export class Register {
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
}

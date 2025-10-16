import { Component, OnInit, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionPersonOutline } from '@ng-icons/ionicons';
import { AuthService } from '../../../services/auth-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
// import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input';
// import { CountryPickerModule } from 'ngx-country-picker';

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
  selectedFile = '';
  profileForm =  new FormGroup({
    profile_picture: new FormControl(''),
    cover_photo: new FormControl(''),
    username: new FormControl(''),
    address: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    pin_code: new FormControl(''),
    location: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    phone_number: new FormControl(''),
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

    onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () =>
        this.profileForm.patchValue({ profile_picture: reader.result as string });
      reader.readAsDataURL(file);
    }
  }


}

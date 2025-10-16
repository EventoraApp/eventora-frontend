import { Component, OnInit, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionCamera, ionCloudUpload, ionTrashOutline } from '@ng-icons/ionicons';
import { AuthService } from '../../../services/auth-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { toast } from 'ngx-sonner';
// import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input';
// import { CountryPickerModule } from 'ngx-country-picker';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, NgIcon],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  viewProviders: provideIcons({
    ionCloudUpload,
    ionTrashOutline,
    ionCamera,
  }),
})
export class Profile implements OnInit {
  private authService = inject(AuthService);
  user: any;
  selectedFile = '';
  profileForm = new FormGroup({
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
  });

  loading = false;

  ngOnInit(): void {
    this.fetchCurrentUser();
  }

  fetchCurrentUser() {
    this.authService.getCurrentUser().subscribe({
      next: (profileData) => {
        console.log('User profile:', profileData);
        this.user = profileData;
        this.profileForm.patchValue({
          profile_picture: profileData.profile_picture,
          cover_photo: profileData.cover_photo,
          username: profileData.username,
          address: profileData.address,
          country: profileData.country,
          state: profileData.state,
          city: profileData.city,
          pin_code: profileData.pin_code,
          location: profileData.location,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          phone_number: profileData.phone_number,
        });
      },
      error: (err) => {
        console.error('Failed to fetch user info:', err);
      },
    });
  }

  onSubmit() {
    this.loading = true;

    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: (res: any) => {
        console.log('Profile updated successfully:', res);
        this.loading = false;
        toast.success('Profile updated  successfully!');
      },
      error: (err) => {
        this.loading = false;
        toast.error(err.error.message[0]);
      },
    });
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () =>
        this.profileForm.patchValue({ cover_photo: reader.result as string });
      reader.readAsDataURL(file);
    }
  }

  onProfileImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () =>
        this.profileForm.patchValue({
          profile_picture: reader.result as string,
        });
      reader.readAsDataURL(file);
    }
  }

  removeCoverPhoto() {
    this.profileForm.patchValue({ cover_photo: '' });
  }
  removeProfilePic() {
    this.profileForm.patchValue({ profile_picture: '' });
  }
}

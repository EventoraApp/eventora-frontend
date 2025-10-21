import { Component, OnInit, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionCamera, ionCloudUpload, ionTrashOutline } from '@ng-icons/ionicons';
import { AuthService } from '../../../services/auth-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { toast } from 'ngx-sonner';
// import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input';
// import { CountryPickerModule } from 'ngx-country-picker';
import { countries } from '../../../models/country'

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
  countries = countries
  user: any;
  selectedFileC = '';
  selectedFileP = '';
  profileForm = new FormGroup({
    profile_picture: new FormControl(''),
    cover_photo: new FormControl(''),
    username: new FormControl(''),
    role: new FormControl(''),
    address: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    location: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    phone_number: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
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
          location: profileData.location,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          phone_number: profileData.phone_number,
          role: profileData.role,
        });
      },
      error: (err) => {
        toast.error('Failed to fetch user info:', err);
      },
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.profileForm.value.cover_photo = "") {
      this.authService.deleteCoverPhoto().subscribe({
        next: (res) => {
          toast.success("Cover Photo deleted successfully")
        },
        error: (err) => {
          toast.error("Couldn't delete cover photo")
        }
      })
    }

    if (this.profileForm.value.profile_picture = "") {
      this.authService.deleteProfilePhoto().subscribe({
        next: (res) => {
          toast.success("Profile Photo deleted successfully")
        },
        error: (err) => {
          toast.error("Couldn't delete profile photo")
        }
      })
    }

     const formData = new FormData();
    const formValues = this.profileForm.value;



    formData.append('username', formValues.username || '');
    formData.append('address', formValues.address || '');
    formData.append('role', formValues.role || '');
    formData.append('location', formValues.location || '');
    formData.append('city', formValues.city || '');
    formData.append('state', formValues.state || '');
    formData.append('country', formValues.country || '');
    formData.append('first_name', formValues.first_name || '');
    formData.append('last_name', formValues.last_name || '');
    formData.append('longitude', formValues.longitude || '');
    formData.append('latitude', formValues.latitude || '');
    formData.append('phone_number', formValues.phone_number || '');

    if (this.selectedFileC) {
      formData.append('cover_photo', this.selectedFileC);
    }
    if (this.selectedFileP) {
      formData.append('profile_picture', this.selectedFileP);
    }



    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: (res: any) => {
        console.log('Profile updated successfully:', res);
        this.loading = false;
        toast.success('Profile updated  successfully!');
      },
      error: (err) => {
        this.loading = false;
        toast.error("An Error occurred");
        console.log(err)
      },
    });
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileC = file;
      const reader = new FileReader();
      reader.onload = () =>
        this.profileForm.patchValue({ cover_photo: reader.result as string });
      reader.readAsDataURL(file);
    }
  }

  onProfileImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileP = file;
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

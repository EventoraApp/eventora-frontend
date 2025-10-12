import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionChevronBack,ionTrashOutline, ionCloudUpload } from '@ng-icons/ionicons';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule,NgIcon,RouterLink],
  templateUrl: './create-event.html',
  styleUrls: ['./create-event.scss'],
    viewProviders: [
    provideIcons({ionChevronBack ,ionCloudUpload,ionTrashOutline}),
  ],
})
export class CreateEvent {

  isDrawerOpen = false;
  event = {
    title: '',
    description: '',
    location: '',
    event_date: '',
    event_time: '',
    capacity: '',
    category: '',
    image: '',
    is_published: false,
  };

  openDrawer() {
    this.isDrawerOpen = true;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.event.image = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log('Event Data:', this.event);
  }

removeImage() {
  this.event.image = '';
}
  
}

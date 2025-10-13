import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  ionChevronBack,
  ionTrashOutline,
  ionCloudUpload,
} from '@ng-icons/ionicons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIcon, RouterLink],
  templateUrl: './create-event.html',
  styleUrls: ['./create-event.scss'],
  viewProviders: [
    provideIcons({ ionChevronBack, ionCloudUpload, ionTrashOutline }),
  ],
})
export class CreateEvent implements OnInit {
  isDrawerOpen: boolean = false;
  isPaid: boolean = false;
  isFree: boolean = false;
  isDonation: boolean = false;

  
  ticketForm = new FormGroup({
    type: new FormControl('Paid'),
    name: new FormControl(''),
    quantity: new FormControl(''),
    price: new FormControl(''),
    event_start_date: new FormControl(''),
    event_start_time: new FormControl(''),
    event_end_date: new FormControl(''),
    event_end_time: new FormControl(''),
  });

  createEventForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(''),
    event_date: new FormControl(''),
    event_time: new FormControl(''),
    capacity: new FormControl(this.ticketForm.value.quantity),
    category: new FormControl(''),
    image: new FormControl(''),
    is_published: new FormControl(false),
  });

  
  handleType(type: string) {
    this.ticketForm.value.type = type;
    this.isPaid = this.ticketForm.value.type === 'Paid';
    this.isFree = this.ticketForm.value.type === 'Free';
    this.isDonation = this.ticketForm.value.type === 'Donation';

    console.log("Donation",this.isDonation,"Free", this.isFree,"Paid", this.isPaid)
  }

constructor() {
  this.ticketForm.get('type')?.valueChanges.subscribe(type => {
  const priceControl = this.ticketForm.get('price');

  if (type === 'Free' || type === 'Donation') {
    priceControl?.disable();
    priceControl?.setValue('');
  } else {
    priceControl?.enable();
  }
});

}

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
      reader.onload = () =>
        (this.createEventForm.value.image = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log('Event Data:', this.createEventForm.value);
  }

  removeImage() {
    this.createEventForm.value.image = '';
  }

  ngOnInit(): void {
    this.isDrawerOpen = false;
  }
}

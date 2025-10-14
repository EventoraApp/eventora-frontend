import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  ionChevronBack,
  ionTrashOutline,
  ionCloudUpload,
} from '@ng-icons/ionicons';
import { RouterLink } from '@angular/router';
import { Events } from '../../../../services/events';

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
  eventService = inject(Events);
  loading = false;

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
    price: new FormControl("100", [Validators.required]),
    capacity: new FormControl(this.ticketForm.value.quantity),
    category: new FormControl(''),
    image: new FormControl(''),
    is_published: new FormControl(false),
  });
  router: any;

  handleType(type: string) {
    this.ticketForm.value.type = type;
    this.isPaid = this.ticketForm.value.type === 'Paid';
    this.isFree = this.ticketForm.value.type === 'Free';
    this.isDonation = this.ticketForm.value.type === 'Donation';

    console.log(
      'Donation',
      this.isDonation,
      'Free',
      this.isFree,
      'Paid',
      this.isPaid
    );
  }

  constructor() {
    this.ticketForm.get('type')?.valueChanges.subscribe((type) => {
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
    if (this.createEventForm.invalid) {
      this.createEventForm.markAllAsTouched();
      console.log("Errors in form",this.createEventForm.value)
      return;
    }
    
    console.log("Errors in form 3",this.createEventForm.value)
    this.loading = true;
    const formData = this.createEventForm.value;

    const payload = {
      title: formData.title,
      image: formData.image,
      description: formData.description,
      location: formData.location,
      event_date: formData.event_date,
      event_time: formData.event_time,
      price: formData.price,
      capacity: formData.capacity,
      category: formData.category,
      is_published: formData.is_published,
    };

    this.eventService.createEvent(payload).subscribe({
      next: (res: any) => {
        console.log('Event created successfully:', res);
        this.loading = false;
        alert('Event created successfully!');
        this.router.navigate(['/dashboard/events']); 
      },
      error: (err) => {
        console.error('Error creating event:', err);
        this.loading = false;
        alert('Failed to create event.');
      },
    });
  }

  removeImage() {
    this.createEventForm.value.image = '';
  }

  ngOnInit(): void {
    this.isDrawerOpen = false;
  }
}

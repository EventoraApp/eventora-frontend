import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  ionChevronBack,
  ionTrashOutline,
  ionCloudUpload,
} from '@ng-icons/ionicons';
import { Router, RouterLink } from '@angular/router';
import { Events } from '../../../../services/events';
import { toast } from 'ngx-sonner';

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
  selectedFile = '';
  router = inject(Router)

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
    price: new FormControl('', [Validators.required]),
    capacity: new FormControl(''),
    category: new FormControl(''),
    image: new FormControl(''),
    is_published: new FormControl(false),
  });

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
        this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () =>
        this.createEventForm.patchValue({ image: reader.result as string });
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.createEventForm.patchValue({
      capacity: this.ticketForm.value.quantity,
      price: this.ticketForm.value.price,
    });
    if (this.createEventForm.invalid) {
      this.createEventForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formData = new FormData();
    const formValues = this.createEventForm.value;

    formData.append('title', formValues.title || '');
    formData.append('description', formValues.description || '');
    formData.append('location', formValues.location || '');
    formData.append('event_date', formValues.event_date || '');
    formData.append('event_time', formValues.event_time || '');
    formData.append('price', formValues.price || '');
    formData.append('capacity', formValues.capacity || '');
    formData.append('category', formValues.category || '');
    formData.append('is_published', formValues.is_published ? 'true' : 'false');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.eventService.createEvent(formData).subscribe({
      next: (res: any) => {
        console.log('Event created successfully:', res);
        this.loading = false;
        toast.success('Event created successfully!');
        this.router.navigate(['/dashboard/events']);
      },
      error: (err) => {
        this.loading = false;
        toast.error('Failed to create event.', err.error);
        console.log(err.error);
      },
    });
  }

  removeImage() {
    this.createEventForm.patchValue({ image: '' });
  }

  ngOnInit(): void {
    this.isDrawerOpen = false;
  }
}

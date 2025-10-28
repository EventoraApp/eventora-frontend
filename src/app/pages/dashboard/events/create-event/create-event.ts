import { Component, inject, OnInit } from '@angular/core';
import { CommonModule,NgClass } from '@angular/common';
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
  ionCloudUpload,ionTicket
} from '@ng-icons/ionicons';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Events } from '../../../../services/events';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../../../services/auth-service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIcon, RouterLink, NgClass],
  templateUrl: './create-event.html',
  styleUrls: ['./create-event.scss'],
  viewProviders: [
    provideIcons({ ionTicket,ionChevronBack, ionCloudUpload, ionTrashOutline }),
  ],
})
export class CreateEvent implements OnInit {
  isDrawerOpen: boolean = false;
  isPaid: boolean = false;
  isFree: boolean = false;
  isDonation: boolean = false;
  eventService = inject(Events);
  authService = inject(AuthService);
  loading = false;
  selectedFile = '';
  router = inject(Router);
  isEditMode = false;
  eventId: string | null = null;
  event: any = null;
  allCategories: any = []
  role = ""

  ticketForm = new FormGroup({
    type: new FormControl('Paid'),
    name: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    event_start_date: new FormControl('', [Validators.required]),
    event_start_time: new FormControl('', [Validators.required]),
    event_end_date: new FormControl('', [Validators.required]),
    event_end_time: new FormControl('', [Validators.required]),
  });

  createEventForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required,Validators.maxLength(150)]),
    location: new FormControl('', [Validators.required]),
    event_date: new FormControl('', [Validators.required]),
    event_time: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
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

  constructor(private route: ActivatedRoute) {
    this.isDrawerOpen = false;
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.isEditMode = true;
      this.loadEvent(this.eventId);
    }

    this.authService.getRole().subscribe({
      next: (res) => {
        this.role = res.role
        if (res.role !== "organizer") {
          toast.warning("Please update your role to an Organizer in your profile to be able to create an Event")
        }
      },
      error: (err) => {
        console.log(err)
      }
    })

    this.ticketForm.get('type')?.valueChanges.subscribe((type) => {
      const priceControl = this.ticketForm.get('price');

      if (type === 'Free' || type === 'Donation') {
        priceControl?.disable();
        priceControl?.setValue('');
      } else {
        priceControl?.enable();
      }
    });

    this.eventService.getCategories().subscribe({
      next: (res) => {
        this.allCategories = res
      },
      error: (err) => {
        toast.error("Couldn't load Categories")
        console.log(err)
      }
    })
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
    if (this.role !== "organizer") {
      toast.error("Please update your role to an Organizer")
      this.router.navigate(['/dashboard/profile'])
    }
    this.createEventForm.patchValue({
      capacity: this.ticketForm.value.quantity,
      price: this.ticketForm.value.price,
    });
    if (!this.createEventForm.value.image) {
      toast.error("Please add an image")
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
    formData.append('category_id', formValues.category || '');
    formData.append('is_published', formValues.is_published ? 'true' : 'false');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditMode) {
      this.eventService.editEvent(this.eventId!, formData).subscribe({
        next: (res: any) => {
          console.log('Event edited successfully:', res);
          this.loading = false;
          toast.success('Event edited successfully!');
          this.router.navigate(['/dashboard/events']);
        },
        error: (err) => {
          this.loading = false;
          toast.error(err.error.message[0]);
          this.router.navigate(['/dashboard/events/', this.eventId, 'edit']);
        },
      });
    } else {
      this.eventService.createEvent(formData).subscribe({
        next: (res: any) => {
          console.log('Event created successfully:', res);
          this.loading = false;
          toast.success('Event created successfully!');
          this.router.navigate(['/dashboard/events']);
        },
        error: (err) => {
          console.log('Event created err:', err);
          this.loading = false;
          toast.error(err.error.message[0]);
          this.router.navigate(['/dashboard/events/new/create']);
        },
      });
    }
  }

  removeImage() {
    this.createEventForm.patchValue({ image: '' });
  }


  ngOnInit(): void {
    
console.log("Oninit Event cet", this.createEventForm.value)
  }

  loadEvent(id: string) {
    this.eventService.getEventById(id).subscribe((eventData) => {
      this.createEventForm.patchValue({
        title: eventData.title,
        description: eventData.description, 
        location: eventData.location,
        event_date: eventData.event_date,
        event_time: eventData.event_time,
        capacity: eventData.capacity,
        category: eventData.category.id,
        image: eventData.image,
        price: eventData.price,
      });

      this.ticketForm.patchValue({
        quantity: eventData.capacity,
        price: eventData.price,
      })
    });
  }
}

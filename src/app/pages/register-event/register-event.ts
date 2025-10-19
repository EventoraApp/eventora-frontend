import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Events } from '../../services/events';
import { toast } from 'ngx-sonner';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { ionCalendar, ionClose, ionLocationSharp } from '@ng-icons/ionicons';

@Component({
  selector: 'app-register-event',
  imports: [NgIcon],
  templateUrl: './register-event.html',
  styleUrl: './register-event.scss',
  viewProviders: [
    provideIcons({
      ionLocationSharp,
      ionCalendar,
      ionClose,
    }),
  ],
})
export class RegisterEvent implements OnInit {
  route = inject(ActivatedRoute);
  eventId: any = null;
  eventService = inject(Events);
  event: any = null;
  isTicketFormShowing: boolean = false;
  ticketCount = signal(1);
  totalPrice = computed(() =>  this.ticketCount() * 200)
  registered: boolean = false

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
  }

  getEvent(id: any) {
    this.eventService.getEventById(id).subscribe({
      next: (res) => {
        this.event = res;
      },
      error: (err) => {
        toast.error("Coudn't fetch this event");
      },
    });
  }

  toggleTicketForm() {
    this.isTicketFormShowing = !this.isTicketFormShowing;
  }

  increment() {
    if (this.ticketCount() === 10) {
      toast.warning("You can only purchase a maximum of 10 tickets")
      return;
    }
    this.ticketCount.set(this.ticketCount() + 1);
  }
  decrement() {
    if (this.ticketCount() === 1) {
      toast.warning("Ticket should not be less than 1")
      return;
    }
    this.ticketCount.set(this.ticketCount() - 1);
  }

  checkout() {
    toast.success("Kudos! You have successfully registered for this event")
    this.registered = !this.registered
    setTimeout(()=>{
      this.toggleTicketForm()
    }, 500)
  }
}

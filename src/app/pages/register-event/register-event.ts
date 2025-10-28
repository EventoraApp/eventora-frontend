import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Events } from '../../services/events';
import { toast } from 'ngx-sonner';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { ionCalendar, ionClose, ionLocationSharp } from '@ng-icons/ionicons';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-register-event',
  imports: [NgIcon, DecimalPipe],
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
  eventTicket: any = null;
  isTicketFormShowing: boolean = false;
  ticketCount = signal(1);
  totalPrice = computed(() =>
    (this.ticketCount() * this.event.price).toFixed(2)
  );
  registered: boolean = false;

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getEvent(this.eventId);
    this.checkRegistration();
  }

  checkRegistration() {
    this.eventService.checkRegistration(this.eventId).subscribe({
      next: (res) => {
        console.log('Register', res);
        this.registered = res.is_registered;
        this.eventTicket = res.ticket;
      },
      error: (err) => {
        toast.error("Coudn't check for registration");
        console.log('Register', err);
      },
    });
  }

  getEvent(id: any) {
    this.eventService.getEventById(id).subscribe({
      next: (res) => {
        this.event = res;
        console.log('Events', this.event);
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
    if (this.ticketCount() ===  10) {
      toast.warning(
        `You can only purchase a maximum of ${this.eventTicket.remaining_tickets_allowed} tickets`
      );
      return;
    }
    this.ticketCount.set(this.ticketCount() + 1);
  }
  decrement() {
    if (this.ticketCount() === 1) {
      toast.warning('Ticket should not be less than 1');
      return;
    }
    this.ticketCount.set(this.ticketCount() - 1);
  }

  checkout() {
    const quantity = this.ticketCount();
    this.eventService
      .buyTickets({
        event: this.eventId,
        quantity: quantity,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          toast.success(
            'Kudos! You have successfully registered for this event'
          );
          this.registered = !this.registered;
          setTimeout(() => {
            this.toggleTicketForm();
            this.initializePayment(quantity);
          }, 500);
        },
        error: (err) => {
          toast.error(err.error[0] || err.error.non_field_errors[0]);
          console.log(err);
        },
      });
  }

  buyMore() {
    const quantity = this.ticketCount();
    this.eventService
      .buyMoreTickets(this.eventTicket.id, {
        quantity: quantity,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          toast.success('Kudos! You have successfully added more tickets');
          this.registered = !this.registered;
          setTimeout(() => {
            this.toggleTicketForm();
            this.initializePayment(quantity);  
          }, 500);
        },
        error: (err) => {
          toast.error( err.error.error);
          console.log(err);
        },
      });
  }

  initializePayment(quant: number) {
    this.eventService
      .makePayment({
        event_id: this.eventId,
        quantity: quant,
      })
      .subscribe({
        next: (res) => {
          toast.success(res.message);
          window.open(`${res.data.authorization_url}`, '_blank');
          window.location.reload()
        },
        error: (err) => {
          toast.error("Couldn't initaite payement");
          console.log(err);
        },
      });
  }
}

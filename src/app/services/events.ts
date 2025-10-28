import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EventRecord } from '../models/event.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Events {
  private http = inject(HttpClient);
  private baseUrl = environment.apiURL;

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/events/`);
  }

  createEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/events/`, eventData);
  }

  getEventById(id: number | string): Observable<any> {
    return this.http.get(`${this.baseUrl}/events/${id}/`);
  }

  getMyEvents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/my-events/`);
  }

  togglePublishEvent(id: number | string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/events/${id}/publish/`, {
      published: true,
    });
  }
  
  deleteEvent(id: number | string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/events/${id}/`);
  }
  
  
  editEvent(id: number | string, eventData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/events/${id}/`, eventData);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/`);
  }

  checkRegistration(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/tickets/check-registration/?event_id=${id}`);
  }

  getEventInfo(id:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/events/${id}/analytics/`);
  }

  getMyTickets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tickets/my-tickets/`);
  }

  getMyTicketStatsAttendee(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tickets/my-tickets/stats/`);
  }

  getMyTicketStatsOrganizer(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tickets/my-tickets/stats/`);
  }
  
  getEventTickets(id:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/tickets/organizer/events/${id}/tickets/`);
  }

  getAllTickets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tickets/organizer/tickets/`);
  }
  
  
  buyTickets(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tickets/register/`,data);
  }
  
  buyMoreTickets(id: any, data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tickets/tickets/${id}/add-more/`, data);
  }
  
  makePayment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/payments/initialize/`,data);
  }
}


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

  getMyTickets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tickets/my-tickets/`);
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
}

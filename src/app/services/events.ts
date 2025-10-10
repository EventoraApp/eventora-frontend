import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EventRecord } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class Events {
  // simple in-memory store
  private events: EventRecord[] = [
    {
      id: 1,
      organizer_id: 1,
      title: 'Hackathon',
      description: 'A 24-hour coding competition.',
      location: 'Accra Tech Hub',
      event_date: '2025-11-16',
      event_time: '10:00:00',
      capacity: 100,
      category: 'Tech',
      image: 'https://via.placeholder.com/150',
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      organizer_id: 1,
      title: 'Design Workshop',
      description: 'Hands-on UI/UX workshop.',
      location: 'Online',
      event_date: '2025-10-20',
      event_time: '14:00:00',
      capacity: 40,
      category: 'Design',
      image: null,
      is_published: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  private events$ = new BehaviorSubject<EventRecord[]>(this.events);

  list(): Observable<EventRecord[]> {
    return this.events$.asObservable();
  }

  getById(id: number): Observable<EventRecord | undefined> {
    return of(this.events.find(e => e.id === id));
  }

  create(payload: Omit<EventRecord, 'id' | 'created_at' | 'updated_at'>): Observable<EventRecord> {
    const id = (this.events.length ? Math.max(...this.events.map(e => e.id)) : 0) + 1;
    const now = new Date().toISOString();
    const newEvent: EventRecord = {
      ...payload,
      id,
      created_at: now,
      updated_at: now
    };
    this.events = [newEvent, ...this.events];
    this.events$.next(this.events);
    return of(newEvent);
  }

  update(id: number, changes: Partial<EventRecord>): Observable<EventRecord | undefined> {
    this.events = this.events.map(e => e.id === id ? { ...e, ...changes, updated_at: new Date().toISOString() } : e);
    this.events$.next(this.events);
    return of(this.events.find(e => e.id === id));
  }

  delete(id: number): Observable<boolean> {
    const before = this.events.length;
    this.events = this.events.filter(e => e.id !== id);
    this.events$.next(this.events);
    return of(this.events.length < before);
  }
}

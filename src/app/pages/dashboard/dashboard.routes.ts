import { Routes } from '@angular/router';
import { Dashboard } from './dashboard';
import { roleGuard } from '../../guards/role-guard';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home').then((m) => m.Home),
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile').then((m) => m.Profile),
      },
      {
        path: 'events',
        loadComponent: () =>
          import('./events/event-list/event-list').then((m) => m.EventList),
      },
      {
        path: 'tickets',
        loadComponent: () =>
          import('./tickets/tickets').then((m) => m.Tickets),
      },
      {
        path: 'events/new/create',
        // canActivate: [roleGuard],
        loadComponent: () =>
          import('./events/create-event/create-event').then(
            (m) => m.CreateEvent
          ),
      },
      {
        path: 'events/:id/edit',
        loadComponent: () =>
          import('./events/create-event/create-event').then(
            (m) => m.CreateEvent
          ),
      },
      {
        path: 'events/:id',
        loadComponent: () =>
          import('./events/event-detail/event-detail').then(
            (m) => m.EventDetail
          ),
      },
    ],
  },
];

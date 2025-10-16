import { Routes } from '@angular/router';
import { Dashboard } from './dashboard';
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
        path: 'events/new/create',
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
            import('./events/event-detail/event-detail').then((m) => m.EventDetail),
        },
    ],
  },
];

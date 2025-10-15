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
        path: 'settings',
        loadComponent: () => import('./settings/settings').then((m) => m.Settings),
      },
      {
        path: 'events',
        loadComponent: () =>
          import('./events/event-list/event-list').then((m) => m.EventList),
      },
      {
        path: 'events/create',
        loadComponent: () =>
          import('./events/create-event/create-event').then(
            (m) => m.CreateEvent
          ),
      },
        {
          path: 'events/:id',
          loadComponent: () =>
          import('./events/create-event/create-event').then(
            (m) => m.CreateEvent
          ),
        },
        {
          path: 'events/:id/edit',
          loadComponent: () =>
            import('./events/edit-event/edit-event').then((m) => m.EditEvent),
        },
    ],
  },
];

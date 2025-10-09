import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () => import('../app/pages/home/home').then((m) => m.Home),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../app/pages/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../app/pages/auth/register/register').then((m) => m.Register),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('../app/pages/auth/forgot-password/forgot-password').then((m) => m.ForgotPassword),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../app/pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'events',
    loadComponent: () =>
      import('../app/pages//events/event-list/event-list').then(
        (m) => m.EventList
      ),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('../app/pages/events/event-detail/event-detail').then(
            (m) => m.EventDetail
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('../app/pages/events/create-event/create-event').then(
            (m) => m.CreateEvent
          ),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('../app/pages/events/edit-event/edit-event').then(
            (m) => m.EditEvent
          ),
      },
    ],
  },
  {
    path: 'my-events',
    loadComponent: () =>
      import('../app/pages/events/my-events/my-events').then((m) => m.MyEvents),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../app/pages/not-found/not-found').then((m) => m.NotFound),
  },
];

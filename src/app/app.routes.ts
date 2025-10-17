import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () => import('../app/pages/home/home').then((m) => m.Home),
  },
  {
    path: 'find-event',
    loadComponent: () => import('../app/pages/find-event/find-event').then((m) => m.FindEvent),
  },
  {
    path: 'register-event/:id',
    loadComponent: () => import('../app/pages/register-event/register-event').then((m) => m.RegisterEvent),
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
    canActivate: [authGuard], 
    loadChildren: () =>
      import('../app/pages/dashboard/dashboard.routes').then((m) => m.routes),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../app/pages/not-found/not-found').then((m) => m.NotFound),
  },
];

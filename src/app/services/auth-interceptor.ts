import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service'; // adjust the path to match your app
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('access_token');
  const router = inject(Router);
  const currentDate = new Date();
  // const tokenTime = Number(localStorage.getItem('token_time'))
  const tokenDate = new Date(localStorage.getItem('token_date')!);
  const diff = tokenDate.getTime() - currentDate.getTime();

  // Clone request and attach access token if available
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  if (diff <= 60000) {
    console.log('Time expired!');
    authService.refreshAccessToken()
  }

  return next(authReq);
};

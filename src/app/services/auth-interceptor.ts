import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';
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
  const tokenDate = new Date(localStorage.getItem('token_date')!);
  const diff = tokenDate.getTime() - currentDate.getTime();


  const authReq = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
    : req;

  if (tokenDate < currentDate) {
    console.log('Date expired!');
    authService.refreshAccessToken().subscribe(res=> console.log("Res",res))
  } else {
    if (diff <= 60000) {
      console.log('Time expired!');
      authService.refreshAccessToken()
    }
  }

  return next(authReq);
};

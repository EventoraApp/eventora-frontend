import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, of } from 'rxjs';
import { toast } from 'ngx-sonner';

let isRefreshing = false;
let refreshTokenPending: any = null;

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('access_token');
  const tokenDate = new Date(localStorage.getItem('token_date') || '');
  const currentDate = new Date();
  const diff = tokenDate.getTime() - currentDate.getTime();

  if (req.url.includes('/refresh')) {
    return next(req);
  }

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  if (tokenDate < currentDate || diff <= 60000) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshTokenPending = authService.refreshAccessToken().pipe(
        switchMap((res: any) => {
          isRefreshing = false;
          refreshTokenPending = null;

          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('token_date', res.access_token_expiry);

          const newReq = req.clone({
            setHeaders: { Authorization: `Bearer ${res.access}` },
          });
          return next(newReq);
        }),
        catchError((err) => {
          toast.error("Session Expired. Please Login")
          isRefreshing = false;
          refreshTokenPending = null;
          localStorage.removeItem('access_token');
          localStorage.removeItem('token_date');
          router.navigate(['/login']);
          return throwError(() => err);
        })
      );

      return refreshTokenPending;
    } else {
      return refreshTokenPending.pipe(
        switchMap((res: any) => {
          const newReq = req.clone({
            setHeaders: { Authorization: `Bearer ${res.access}` },
          });
          return next(newReq);
        })
      );
    }
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        
          toast.error("Session Expired. Please Login")
        localStorage.removeItem('access_token');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};

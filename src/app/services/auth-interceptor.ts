import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service'; // adjust the path to match your app
import { catchError, switchMap, throwError } from 'rxjs';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('access_token');
  const router = inject(Router)

  // Clone request and attach access token if available
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status === 401 &&
        !req.url.includes('/api/users/login/') &&
        !req.url.includes('/api/users/register/')
      ) {
        return authService.refreshAccessToken().pipe(
          switchMap((newToken: string) => {
            localStorage.setItem('access_token', newToken);

            const newReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` },
            });

            return next(newReq);
          }),
          catchError((refreshError) => {
            // authService.logout();
            toast.error("Couldn't Retrieve Session", refreshError.error);
            console.log(refreshError.error);
            router.navigate(['/login'])
            return throwError(() => refreshError);
          })
        );
      }
      router.navigate(['/login'])

      return throwError(() => error);
    })
  );
};

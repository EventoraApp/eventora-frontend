import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = environment.apiURL;
  private baseUrl = this.apiURL;

  private http = inject(HttpClient);

  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/register/`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  loginUser(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login/`, credentials).pipe(
      tap((res: any) => {
        if (res.access && res.refresh) {
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);
          localStorage.setItem('user', res);
        }
      })
    );
  }

  refreshAccessToken() {
    const refresh = localStorage.getItem('refresh_token');
    console.log("I was called")
   return this.http.post(`${this.baseUrl}/users/token/refresh/`, {refresh: refresh}).pipe(
      tap((res: any) => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  getStoredUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/me/`);
  }

  updateProfile(data: any): Observable<any>  {
    return this.http.put( `${this.baseUrl}/users/me/profile`,data)
  }
}

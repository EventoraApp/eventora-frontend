import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = environment.apiURL
  private baseUrl = this.apiURL;

  private http = inject(HttpClient);

  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/register/`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  loginUser(credentials: {
    username: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login/`, credentials).pipe(
      tap((res: any) => {
        if (res.access && res.refresh) {
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // localStorage.removeItem('user');
  }

  getStoredUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/me/`)
    // .pipe(
    //   tap((res) => {
    //     localStorage.setItem('user', JSON.stringify(res));
    //   })
    // );
  }
}

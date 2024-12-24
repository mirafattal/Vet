import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { APIClient, LoginRequestDto } from '@shared/services/api-client/veterinary-api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

  private readonly TOKEN_KEY = 'authToken'; // Key to store JWT in localStorage
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private apiClient: APIClient, private router: Router) { }

    // 1. Login Method
    login(loginRequest: LoginRequestDto): Observable<void> {
      return this.apiClient.login(loginRequest).pipe(
        tap((response: any) => {
          this.saveToken(response.token);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError((error) => {
          console.error('Login error:', error);
          throw error;
        })
      );
    }

    // 2. Logout Method
    logout(): void {
      this.clearTokens();
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/login']); // Navigate to login page
    }

    // 3. Save Token
    private saveToken(token: string): void {
      localStorage.setItem(this.TOKEN_KEY, token);
    }

    // 4. Get Token
    getToken(): string | null {
      return localStorage.getItem(this.TOKEN_KEY);
    }

    // 7. Clear Tokens
    private clearTokens(): void {
      localStorage.removeItem(this.TOKEN_KEY);
    }

    // 8. Check Authentication Status
    checkAuthStatus(): boolean {
      const token = this.getToken();
      if (token) {
        this.isAuthenticatedSubject.next(true);
        return true;
      }
      this.isAuthenticatedSubject.next(false);
      return false;
    }
}

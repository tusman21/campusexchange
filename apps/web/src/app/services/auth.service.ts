import { Injectable, signal, computed, effect, inject } from '@angular/core';
import {
  httpResource,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { SignInDto, CreateUserDto, User } from '@shared/models';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_KEY = 'cexAccessToken';

export interface AuthState {
  token: string | null;
  sessionEstablished: boolean;
  loading: boolean;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _http = inject(HttpClient);
  private _router = inject(Router);
  private _state = signal<AuthState>({
    token: null,
    sessionEstablished: false,
    loading: false,
  });

  token = computed(() => this._state().token);
  sessionEstablished = computed(() => this._state().sessionEstablished);
  loading = computed(() => this._state().loading);
  error = computed(() => this._state().error);
  currentUser = httpResource<User>(() =>
    this.sessionEstablished() ? '/api/auth/whoami' : undefined
  );

  constructor() {
    this._initialize();
    effect(() => {
      const token = this.token();
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    });
  }
  private _initialize() {
    const { pathname } = window.location;
    if (pathname.includes('login') || pathname.includes('signup')) {
      return;
    }
    this._state.set({
      token: localStorage.getItem(TOKEN_KEY),
      sessionEstablished: !!localStorage.getItem(TOKEN_KEY),
      loading: false,
    });
  }
  login(dto: SignInDto) {
    this._state.update((state) => ({ ...state, loading: true }));
    this._http
      .post<{ accessToken: string }>('/api/auth/login', dto)
      .pipe(
        tap((response) => {
          this._state.set({
            token: response.accessToken,
            sessionEstablished: true,
            loading: false,
          });
          this._router.navigate(['/home']);
        }),
        catchError((error: HttpErrorResponse) => {
          this._state.set({
            token: null,
            sessionEstablished: false,
            loading: false,
            error:
              error.error?.message || 'An error occurred. Please try again.',
          });
          return throwError(() => error);
        })
      )
      .subscribe();
  }
  register(dto: CreateUserDto) {
    this._state.update((state) => ({ ...state, loading: true }));
    this._http
      .post<{ accessToken: string }>('/api/auth/signup', dto)
      .pipe(
        tap(() => {
          this._state.update((state) => ({
            ...state,
            loading: false,
          }));
          this._router.navigate(['/login']);
        }),
        catchError((error: HttpErrorResponse) => {
          this._state.update((state) => ({
            ...state,
            loading: false,
            error:
              error.error?.message || 'An error occurred. Please try again.',
          }));
          return throwError(() => error);
        })
      )
      .subscribe();
  }
  logout() {
    this._state.set({
      token: null,
      sessionEstablished: false,
      loading: false,
      error: undefined,
    });
  }
}

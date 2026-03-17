import { Injectable, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private _auth = inject(AuthService);
  private _router = inject(Router);

  constructor() {
    effect(() => {
      const isEstablished = this._auth.sessionEstablished();
      if (isEstablished) {
        this._router.navigate(['/home']);
      }
    });
  }
}

import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const accessToken = inject(AuthService).token();
  const clonedReq = req.clone(
    accessToken
      ? {
          headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
        }
      : {}
  );
  return next(clonedReq);
}

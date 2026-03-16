import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@campusexchange/models';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  userResource = httpResource<User>(() => '/api');
}

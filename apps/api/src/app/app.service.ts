import { Injectable } from '@nestjs/common';
import { User } from '@shared/models';

@Injectable()
export class AppService {
  getData(): User {
    return {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };
  }
}

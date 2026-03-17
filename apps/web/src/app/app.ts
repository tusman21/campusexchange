import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationService } from './services/navigation.service';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
})
export class App {
  navigator = inject(NavigationService);
}

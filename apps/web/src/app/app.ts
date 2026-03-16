import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { AppService } from './app.service';

@Component({
  imports: [NxWelcome, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'web';

  protected readonly appService = inject(AppService);
  protected readonly userResource = this.appService.userResource;
  protected readonly user = this.userResource.value;
  protected readonly isLoading = this.userResource.isLoading;
  protected readonly error = this.userResource.error;

  constructor() {
    // Kick off the initial fetch, if not already loaded.
    if (!this.userResource.hasValue()) {
      this.userResource.reload();
    }
  }

  protected refreshUser(): void {
    this.userResource.reload();
  }
}

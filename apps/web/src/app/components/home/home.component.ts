import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cex-home',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar>
      <button matIconButton class="example-icon">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Campus Exchange</span>
      <span class="flex-spacer"></span>
      <button matIconButton class="example-icon favorite-icon">
        <mat-icon>favorite</mat-icon>
      </button>
      <button matIconButton class="example-icon">
        <mat-icon>share</mat-icon>
      </button>
    </mat-toolbar>

    @if (currentUser(); as currentUser) {
      You are now logged in as {{ currentUser.firstName }}
      {{ currentUser.lastName }}!
    }
  `,
})
export class HomeComponent {
  private _authService = inject(AuthService);
  currentUser = this._authService.currentUser.value;
}

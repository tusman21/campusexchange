import { Component, inject, OnInit } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

const ALLOWED_EMAIL_DOMAIN = '@fau.edu';

@Component({
  selector: 'cex-signup',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  readonly allowedEmailDomain = ALLOWED_EMAIL_DOMAIN;
  private _authService = inject(AuthService);
  private _fb = inject(NonNullableFormBuilder);

  form = this._fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+$/)],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/),
      ],
    ],
  });
  loading = this._authService.loading;
  error = this._authService.error;

  ngOnInit(): void {
    this._authService.logout();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const { email, ...rest } = this.form.getRawValue();
    this._authService.register({
      ...rest,
      email: `${email}${ALLOWED_EMAIL_DOMAIN}`,
    });
  }
}

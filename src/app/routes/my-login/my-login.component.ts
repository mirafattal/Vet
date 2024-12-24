import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { MyAuthService } from './my-auth-service/my-auth.service';
import { AuthService } from '@core/authentication';
import { LoginRequestDto } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-my-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MtxButtonModule,
    TranslateModule,
  ],
  templateUrl: './my-login.component.html',
  styleUrl: './my-login.component.scss'
})
export class MyLoginComponent {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly myauth = inject(MyAuthService);

  isSubmitting = false;

  loginForm = this.fb.nonNullable.group({
    username: ['ng-matero', [Validators.required]],
    password: ['ng-matero', [Validators.required]],
    rememberMe: [false],
  });

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe')!;
  }

  myLogin() {
    if (this.loginForm.invalid) {
      return; // Stop if form is invalid
    }

    this.isSubmitting = true; // Indicate that the login process has started

    const loginRequest = {
      username: this.username.value,
      password: this.password.value,
    } as LoginRequestDto;

    this.myauth.login(loginRequest).subscribe({
      next: () => {
        console.log('Login successful!');
        this.router.navigate(['/dashboard']); // Redirect after login
      },
      error: (err) => {
        console.error('Login failed:', err);
        // Handle login errors (e.g., show an error message)
      },
    });
  }

  // login() {
  //   this.isSubmitting = true;

  //   this.auth
  //     .login(this.username.value, this.password.value, this.rememberMe.value)
  //     .pipe(filter(authenticated => authenticated))
  //     .subscribe({
  //       next: () => {
  //         this.router.navigateByUrl('/');
  //       },
  //       error: (errorRes: HttpErrorResponse) => {
  //         if (errorRes.status === 422) {
  //           const form = this.loginForm;
  //           const errors = errorRes.error.errors;
  //           Object.keys(errors).forEach(key => {
  //             form.get(key === 'email' ? 'username' : key)?.setErrors({
  //               remote: errors[key][0],
  //             });
  //           });
  //         }
  //         this.isSubmitting = false;
  //       },
  //     });
  //   }
}

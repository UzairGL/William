import { Component, inject, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    this.loginForm = this.fb.nonNullable.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  private fb: FormBuilder = inject(FormBuilder);

  onSubmit() {
    if (!this.loginForm.valid) {
      alert('Wrong form input');
    } else {
      const email = this.loginForm.get('email')?.value;

      this.userService.getUserByEmail(email).subscribe({
        next: (user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['']);
          } else {
            alert('User does not exist');
          }
        },
        error: (err) => console.error(err),
      });
    }
  }

  showRegisterPage(): void {
    this.router.navigate(['/register']);
  }
}

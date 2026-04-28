import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    this.registerForm = this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  private fb: FormBuilder = inject(FormBuilder);

  onSubmit() {
    if (!this.registerForm.valid) {
      alert('Wrong form input');
    } else {
      var firstname = this.registerForm.get('firstName');
      var lastname = this.registerForm.get('lastName');
      var age = this.registerForm.get('age');
      var email = this.registerForm.get('email');

      const userToPost: User = {
        firstName: firstname?.value,
        lastName: lastname?.value,
        age: Number(age?.value),
        email: email?.value,
        points: 0,
      };

      this.userService.getUserByEmail(email?.value).subscribe({
        next: (user) => {
          if (user) {
            alert('User already exists');
          } else {
            this.userService.postUser(userToPost).subscribe({
              next: (user) => {
                this.router.navigate(['']);
                localStorage.setItem('user', JSON.stringify(user));
              },
              error: (e) => console.error(e),
            });
          }
        },
        error: (err) => {
          if (err.status === 404) {
            this.userService.postUser(userToPost).subscribe({
              next: () => this.router.navigate(['']),
              error: (e) => console.error(e),
            });
          } else {
            console.error(err);
          }
        },
      });
    }
  }

  showLoginPage(): void {
    this.router.navigate(['/login']);
  }
}

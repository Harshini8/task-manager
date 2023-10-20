import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SignupStart } from 'src/app/store/actions/auth.actions';
import { SpinnerService } from 'src/services/spinner-services/spinner.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  userRegisterForm!: FormGroup;
  userDetails: {
    username: string;
    password: string;
    email: string;
  } = {
    username: '',
    password: '',
    email: '',
  };
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private store: Store,
    private spinner: SpinnerService
  ) {}
  ngOnInit(): void {
    console.log('signup component loaded');
    this.userRegisterForm = this.builder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: [
        '',
        [
          validatePasswordLength,
          validPasswordSpecialChar,
          validPasswordNumber,
          validPasswordUpperCase,
        ],
      ],
      confirmPassword: [''],
      email: ['', [Validators.email]],
    });

    this.userRegisterForm
      .get('confirmPassword')!
      .valueChanges.subscribe((data) => {
        if (this.userRegisterForm.get('password')!.value !== data) {
          this.userRegisterForm
            .get('confirmPassword')!
            .setErrors({ notMatch: true });
        }
      });
  }

  registerUser() {
    this.userDetails.username = this.userRegisterForm.get('username')!.value;
    this.userDetails.password = this.userRegisterForm.get('password')!.value;
    this.userDetails.email = this.userRegisterForm.get('email')!.value;
    this.spinner.showSpinner();
    this.store.dispatch(new SignupStart(this.userDetails));
  }
}

function validatePasswordLength(c: FormControl) {
  let password = c.value;
  if (password.length < 8) {
    return { validPasswordLength: true };
  }
  return null;
}

function validPasswordSpecialChar(c: FormControl) {
  let password = c.value;
  const specialChars = /[!@#$%^&*?]/;
  if (!specialChars.test(password)) {
    return { validPasswordSpecialChar: true };
  }
  return null;
}

function validPasswordNumber(c: FormControl) {
  let password = c.value;
  const nums = /[\d]/;
  if (!nums.test(password)) {
    return { validPasswordNumber: true };
  }
  return null;
}

function validPasswordUpperCase(c: FormControl) {
  let password = c.value;
  const upperCase = /[A-Z]/;
  if (!upperCase.test(password)) {
    return { validPasswordUpperCase: true };
  }
  return null;
}

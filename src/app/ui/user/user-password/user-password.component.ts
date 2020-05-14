import { AuthService } from './../../../services/auth.service';
import { PasswordValidator } from './../../authentication/sign-up/validators.validator';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {

  errorMessage = null;
  showErrors: boolean;

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required] ),
    password: new FormControl('', [Validators.required, Validators.minLength(6), PasswordValidator.strong] ),
    repeatPassword: new FormControl('', [Validators.required]),
  }, PasswordValidator.match);

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.showErrors = false;
  }

  onSubmit() {
    if (!this.changePasswordForm.valid) {
      this.showErrors = true;
      return;
    }
    const passData = {
      old_password: this.changePasswordForm.value.oldPassword,
      new_password: this.changePasswordForm.value.password,
      new_password2: this.changePasswordForm.value.repeatPassword
    };
    console.log('password-Change');

    this.authService.changePassword(passData);
  }
}

import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoading = false;
  errorMessage = null;
  constructor(private authService: AuthService, private router: Router) { }

  // Razmisliti dali je potrebno uvesti odgovarajuce ogranicenje ukoliko neko pokusa mnogo puta da se loguje!
  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) { return; }

    this.errorMessage = null;
    this.isLoading = true;

    const e = form.value.email;
    const p = form.value.password;

    // TODO Potrebno vratiti na stranicu sa koje je otisao
    this.authService.signin(e, p).subscribe((responseData) => {
      this.isLoading = false;
      if (responseData.is_stuff) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/home']);
      }
    }, (errMessage) => {
      this.errorMessage = errMessage;
      this.isLoading = false;
    });

    form.reset();
    form.setValue({
      email: e,
      password: ''
    });

  }
}

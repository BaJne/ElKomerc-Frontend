import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TransitionService } from '../../../services/transition.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  isLoading = false;
  errorMessage = null;
  returnPage = '/home';
  returnSub: Subscription;

  constructor(
    private authService: AuthService,
    private transitService: TransitionService,
    private router: Router
  ) { }

  // TODO Razmisliti dali je potrebno uvesti odgovarajuce ogranicenje ukoliko neko pokusa mnogo puta da se loguje!
  ngOnInit() {
    this.returnSub = this.transitService.logInLink.subscribe(l => {
      this.returnPage = l;
    });
  }
  ngOnDestroy() {
    this.returnSub.unsubscribe();
  }
  onSubmit(form: NgForm) {
    if (!form.valid) { return; }

    this.errorMessage = null;
    this.isLoading = true;

    const e = form.value.email;
    const p = form.value.password;

    this.authService.signin(e, p).subscribe((responseData) => {
      this.isLoading = false;
      if (responseData.is_stuff) {
        this.router.navigate(['/admin/dashboard']);
      }
      else if (this.returnPage !== null) {
        this.router.navigate([this.returnPage]);
      }
      else {
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

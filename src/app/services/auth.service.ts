import { Globals, ServerResponseData } from './globals';
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { messagetype } from 'src/app/models/message.model';
import { MessageService } from './message.service';
import { throwError, BehaviorSubject } from 'rxjs';

interface SignUpResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  private TOO_MANY_ATTEMPTS_TRY_LATER: 'TOO_MANY_ATTEMPTS_TRY_LATER : Too many unsuccessful login attempts. Please try again later.';
  private INVALID_PASSWORD = 'INVALID_PASSWORD';
  private EMAIL_NOT_FOUND = 'EMAIL_NOT_EXSIST';
  private USER_DISABLED = 'USER_DISABLED';
  private EMAIL_EXISTS = 'Account with this email address already exists.';
  private EMAIL_NOT_ACTIVE = 'USER_NOT_ACTIVE';

  constructor(
      private http: HttpClient,
      private globals: Globals,
      private messageService: MessageService
    ) {
    this.autoLogin();
  }

  processErrorMassage(errorMessages, msg: string) {
    switch (msg) {
      case this.EMAIL_EXISTS: errorMessages.push('Nalog sa datom email adresom vec postoji.'); break;
      case this.INVALID_PASSWORD: errorMessages.push('Pogresna kombinacija email i lozinke.'); break;
      case this.EMAIL_NOT_FOUND: errorMessages.push('Pogresna kombinacija email i lozinke.'); break;
      case this.USER_DISABLED: errorMessages.push('Ovaj nalog je trenutno suspendovan.'); break;
      case this.EMAIL_NOT_ACTIVE: errorMessages.push('Korisnički nalog nije aktiviran. Molimo da ga prvo aktivirajte.'); break;
      case this.TOO_MANY_ATTEMPTS_TRY_LATER: errorMessages.push('Previse neuspesnih pokusaja. Molimo pokusajte kasnije.'); break;
      default: errorMessages.push('Dogodila se nepoznata greska prilikom slanja zahteva. Molimo pokusajte kasnije.');
    }
  }
  errorHandling(errorRes: HttpErrorResponse) {
    console.log(errorRes);

    const errorMessages = [];

    if (!errorRes.error) {
      return throwError(errorMessages);
    }
    // tslint:disable-next-line: forin
    for (const key in errorRes.error) {
      let msgArray: string[] = [];
      if (errorRes.error.hasOwnProperty(key)) {
        msgArray = errorRes.error[key];

        if (msgArray instanceof Array) {
          msgArray.forEach(msg => {
            this.processErrorMassage(errorMessages, msg);
          });
        } else {
          this.processErrorMassage(errorMessages, msgArray);
        }
      }
    }
    if (errorMessages.length === 0) { errorMessages.push('Server je trenutno nedostupan.'); }
    return throwError(errorMessages);
  }

  autoLogout(expireDate: Date) {
    const expirationDuration =
      (expireDate.getTime() - new Date().getTime());

    this.tokenExpirationTimer = setTimeout(() => {
      this.messageService.sendMessage({
        key: 'hold',
        text: 'Vaša sesija je istekla.Molimo prijavite se ponovo.',
        type: messagetype.warn
      });
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string,
      localId: string,
      _token: string,
      _tokenExpirationDate: string
    }
      = JSON.parse(localStorage.getItem('userData'));
    if (userData === null) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.localId,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
      this.autoLogout(new Date(userData._tokenExpirationDate));
      this.user.next(loadedUser);
    }
  }
  // Metod za odjavljivanje trenutno aktivnog korisnika
  logout() {
    localStorage.removeItem('userData');
    this.user.next(null);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  // Metoda za prijavljivanje korisnika na server
  signin(name: string, pass: string) {
    return this.http.post(this.globals.location + '/api/auth/', {
      email: name,
      password: pass
    })
      .pipe(
        catchError(this.errorHandling.bind(this)),
        tap((responseData: any) => {
          const expireDate = new Date(responseData.expires);

          const user = new User(
            responseData.email,
            responseData.localId,
            responseData.token,
            expireDate
          );
          localStorage.setItem('userData', JSON.stringify(user));
          this.autoLogout(expireDate);
          this.user.next(user);
        })
      );
  }

  // Metoda za kreiranje novog naloga
  // userData {email: string, password: string, address: string, phone: string, city: string, post: string, type: string}
  signup(
    userData: any,
    additionalData: any
  ) {
    return this.http.post<SignUpResponseData>(
      this.globals.location + '/api/auth/register/',
      {
        email: userData.email,
        password: userData.password,
        profile_image: null,
        address: userData.address,
        phone_number: userData.phone,
        city: userData.city,
        zip_code: userData.post,
        account_type: userData.type,
        data: additionalData
      },
    ).pipe(catchError(this.errorHandling.bind(this)));
  }
  // Dohvataju se informacije grad / post_codes
  getCityInfo(s: string) {
    return this.http.get<ServerResponseData>(
      this.globals.location + '/api/post-codes/',
      { params: new HttpParams().set('city', s) }
    )
      .pipe(map(data => {
        const cityData: { cities: string[], zip_codes: string[] } = {
          cities: [],
          zip_codes: []
        };
        data.results.forEach((x: { city: string, zip_code: string }, index) => {
          cityData.cities.push(x.city);
          cityData.zip_codes.push(x.zip_code);
        });
        return cityData;
      }));
  }
}

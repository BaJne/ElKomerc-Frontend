import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidator } from './validators.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  cities: string[];
  postCodes: string[];

  isPerson = true;
  errorMessage = null;            // String za ispisivanje greske ukoliko se desila na serverskoj strani
  isLoading = false;               // Indikator za signaliziranje komunikacije sa serverom
  isAccountCreated = false;       // Indikator za dalje korake ukoliko je nalog kreiran

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), PasswordValidator.strong] ),
    repeatPassword: new FormControl('', [Validators.required]),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    post: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),

    person: new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('' , Validators.required),
      birthDate: new FormControl('')
    }),
    company: new FormGroup({
      name: new FormControl('', Validators.required),
      fax: new FormControl(''),
      pib: new FormControl('', Validators.required)
    })
  }, PasswordValidator.match
  );

  constructor(private authService: AuthService ) { }

  ngOnInit() {
    this.signUpForm.get('company').disable();
  }

  onChangeForm(b: boolean) {
    if (b === this.isPerson) { return; }
    if (b) {
      this.signUpForm.get('person').enable();
      this.signUpForm.get('company').disable();
    } else {
      this.signUpForm.get('person').disable();
      this.signUpForm.get('company').enable();
    }
    this.isPerson = b;
  }

  // City autocomplete
  onCitySelected(city: string) {
    let index = 0;
    while (this.cities[index] !== city) { index++; }
    this.signUpForm.get('post').setValue(this.postCodes[index]);
  }
  searchForCity(event) {
    this.authService.getCityInfo(event.query).subscribe( data => {
      this.cities = data.cities;
      this.postCodes = data.zip_codes;
    });
  }

  // Submit method
  onSubmit() {
    if (!this.signUpForm.valid) { return; }

    this.isLoading = true;
    const user = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      address: this.signUpForm.value.address,
      city: this.signUpForm.value.city,
      post: this.signUpForm.value.post,
      phone: 9999999999, // this.signUpForm.value.phone,
      type: this.isPerson ? 'USR' : 'CMP'
    };

    // User or company data
    let additionalData;
    if (!this.isPerson) {
      additionalData = {
        company_name: this.signUpForm.value.company.name,
        pib: this.signUpForm.value.company.pib,
        fax: this.signUpForm.value.company.fax
      };
    } else {
      additionalData = {
        first_name: this.signUpForm.value.person.name,
        last_name: this.signUpForm.value.person.lastName,
        date_of_birth: this.signUpForm.value.person.birthDate
      };
    }

    this.authService.signup(
      user,
      additionalData
    )
    .subscribe((data) => {
      this.isLoading = false;
      this.isAccountCreated = true;
      console.log(data);
    }, (error) => {
      this.errorMessage = error;
      this.isLoading = false;
    });

  }
}

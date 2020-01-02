import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isPerson = true;

  signUpForm = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null),
    repeatPassword: new FormControl(null),
    address: new FormControl(null),
    city: new FormControl(null),
    phone: new FormControl(null),
    post: new FormControl(null),

    person: new FormGroup({
      name: new FormControl(null, Validators.required),
      lastName: new FormControl(null , Validators.required),
      birthDate: new FormControl(new Date(), Validators.required)
    }),
    company: new FormGroup({
      name: new FormControl(null, Validators.required),
      bankAccount: new FormControl(null, Validators.required),
      pib: new FormControl(null, Validators.required)
    })
  });

  constructor(private render: Renderer2) { }

  ngOnInit() {
    this.signUpForm.get('company').disable();
  }

  onChangeForm(b: boolean) {
    if (b === this.isPerson) { return; }
    console.log(b);
    if (b) {
      this.signUpForm.get('person').enable();
      this.signUpForm.get('company').disable();
    } else {
      this.signUpForm.get('person').disable();
      this.signUpForm.get('company').enable();
    }
    this.isPerson = b;
  }

  // Validators
  requiredProperty(control: FormControl): {[s: string]: boolean} {
    if (true) { return {propertyIsRequired: true}; }
    return null;
  }

  // Submit method
  onSubmit() {
    console.log(this.signUpForm);
  }
}

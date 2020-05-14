import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit, OnDestroy {
  isAutenticated: Subscription;
  user: User = null;

  // Forma usera
  fileToUpload: File = null;
  imgURL: any = null;
  errorMessage = null;
  cities: string[];
  postCodes: string[];

  signUpForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    address: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    post: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),

    person: new FormGroup({
      name: new FormControl(null, Validators.required),
      lastName: new FormControl(null , Validators.required),
      birthDate: new FormControl(null)
    }),
    company: new FormGroup({
      name: new FormControl(null, Validators.required),
      fax: new FormControl(null),
      pib: new FormControl(null, Validators.required)
    })
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loadUserDetails();
    this.isAutenticated = this.authService.user.subscribe(data => {
      if (data === null) { return; }
      this.user = data;
      if (this.user.details === null) { return; }
      this.signUpForm.controls['email'].setValue(this.user.email);
      this.signUpForm.controls['address'].setValue(this.user.details.address);
      this.signUpForm.controls['city'].setValue(this.user.details.city);
      this.signUpForm.controls['post'].setValue(+this.user.details.zip_code);
      this.signUpForm.controls['phone'].setValue(this.user.details.phone_number);
      if (this.user.details.account_type === 'USR') {
        this.signUpForm.controls['person'].setValue({
          name: this.user.details.first_name,
          lastName: this.user.details.last_name,
          birthDate: this.user.details.date_of_birth
        });
      } else {
        this.signUpForm.controls['company'].setValue({
          name: this.user.details.company_name,
          fax: this.user.details.fax,
          pib: this.user.details.pib
        });
      }
    });

  }
  ngOnDestroy() {
    this.isAutenticated.unsubscribe();
  }
  // File upload
  handleFileInput(files: FileList) {
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";    ISPISATI PORUKU
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
    };

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
  onSubmit() {
    return;
  }
}
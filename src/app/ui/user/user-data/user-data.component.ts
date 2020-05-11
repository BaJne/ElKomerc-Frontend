import { UserService } from './../../../services/user.Service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.userService.getUserDetails();
  }

}

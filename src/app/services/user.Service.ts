import { Globals } from './globals';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private messageService: MessageService, private http: HttpClient, private globals: Globals) {}
  getUserDetails(token: string) {
    // this.http.get(this.globals.location + )
  }
}

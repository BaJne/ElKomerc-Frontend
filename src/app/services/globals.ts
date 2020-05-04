import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class Globals {
  location = 'http://localhost:8000';
  clientDomain = location.origin;
}
export interface ServerResponseData {
  count: number;
  next: string;
  previous: string;
  results: any[];
}

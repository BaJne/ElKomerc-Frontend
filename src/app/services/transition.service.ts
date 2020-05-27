import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransitionService {
  pageDetails = new Map<string, any>();
  logInLink = new BehaviorSubject<any>(null);

  constructor() {
    if (sessionStorage.pages !== undefined) {
      this.pageDetails = new Map(JSON.parse(sessionStorage.pages));
    } else {
      this.pageDetails = new Map<string, any>();
    }
    if (sessionStorage.getItem('logInLink') !== undefined) {
      this.logInLink.next(sessionStorage.getItem('logInLink'));
    }
  }
  setPageDetails(s: string, data: any) {
    this.pageDetails.set(s, data);
    sessionStorage.pages = JSON.stringify(Array.from(this.pageDetails.entries()));
  }
  setLogInReturnPage(l: string) {
    this.logInLink.next(l);
    if (l !== undefined && l !== '') {
      sessionStorage.setItem('logInLink', l);
    } else {
      sessionStorage.removeItem('logInLink');
    }
  }
  getPageDetails(s: string) {
    if (this.pageDetails.has(s)) {
      return this.pageDetails.get(s);
    }
    return undefined;
  }
  clearPageDetails(s: string) {
    this.pageDetails.delete(s);
    sessionStorage.pages = JSON.stringify(Array.from(this.pageDetails.entries()));
  }
}

import { ArticalService } from './../../services/artical.service';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user.model';
import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User = null;

  constructor(
    private authService: AuthService,
    public articalService: ArticalService,
    private render: Renderer2
  ) {}

  ngOnInit() {
    // this.user = this.authService.logedUser;
    this.authService.user.subscribe(data => {
      this.user = data;
    });
  }
  logout() {
    this.authService.logout();
  }
}

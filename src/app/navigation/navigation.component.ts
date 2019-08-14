import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  shouldShow = false;
  isAuth = false;
  private userSub: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  onLogout() {
    this.authService.logOut();
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}

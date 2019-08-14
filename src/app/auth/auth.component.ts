import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthorisedUser } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onSubmit(form: NgForm){
    this.isLoading = true;

    let authObs: Observable<AuthorisedUser>;

    this.isLoading = true;
    authObs = this.authService.logIn(form.value.username, form.value.password);
    authObs.subscribe(
      response => {
        this.isLoading = false;
        this.isError = false;
        this.router.navigate(['/list']);
      },
      error => {
        this.isError = true;
        this.isLoading = false;
      }
    )
    form.reset();
  }
}
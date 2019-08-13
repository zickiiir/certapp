import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthorisedUser } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  isLoading: boolean = false;
  error: boolean = null;
  
  constructor(
    private authService: AuthService
  ){}

  onSubmit(form: NgForm){
    let authObs: Observable<AuthorisedUser>;

    this.isLoading = true;
    authObs = this.authService.signIn(form.value.username, form.value.password);
    authObs.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    )
    form.reset();
  }
}
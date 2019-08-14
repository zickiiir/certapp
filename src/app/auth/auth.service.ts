import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from "rxjs";
import { User } from '../models/user.model';
import { Router } from '@angular/router';

export interface AuthorisedUser {
  token: string;
  expiration: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpiration: any;

  constructor (
    private http: HttpClient, private router: Router
  ){}

  logIn(username: string, password: string){
    return this.http.post<AuthorisedUser>(
      'http://private-anon-794a2b8884-certicon.apiary-mock.com/auth',
      {
        userName: username,
        password: password
      }
    ).pipe(
      catchError(this.handleError),
      tap(res => {
        this.handleAuth(res.token);
      })
    );
  }

  autoLogin(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
    if (!userData) {
      return;
    }
    const loggedUser = new User(userData._token, userData._tokenExpire);
    if (loggedUser.token) {
      this.user.next(loggedUser);
      const expiration = new Date(userData._tokenExpire).getTime() - new Date().getTime();
      this.autoLogout(expiration);
    }
  }

  autoLogout(duration: number){
    this.tokenExpiration = setTimeout(() => {
      this.logOut();
    }, duration);
  }

  logOut(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpiration) {
      clearTimeout(this.tokenExpiration);
    }
    this.tokenExpiration = null;
  }

  private handleError(errorResponse: HttpErrorResponse) {
    return throwError('An unknown error occured!');
  }

  private handleAuth(token: string) {
    const expireTime = new Date(new Date().getTime() + 7200000);
    const expiresIn = expireTime.getTime() - new Date().getTime();
    const user = new User(token, expireTime);
    this.user.next(user);
    this.autoLogout(expiresIn);
    localStorage.setItem('userData', JSON.stringify(user));
  }

}




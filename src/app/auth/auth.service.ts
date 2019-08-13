import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from "rxjs";
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthorisedUser {
  token: string;
  expiration: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private token: any;

  constructor (
    private http: HttpClient, private router: Router
  ){}

  signIn(username: string, password: string){
    return this.http.post<AuthorisedUser>(
      'http://private-anon-794a2b8884-certicon.apiary-mock.com/auth',
      {
        userName: username,
        password: password
      }
    );
  }

  private handleError(errorResponse: HttpErrorResponse){
    return throwError('An unknown error occured!');
  }

}




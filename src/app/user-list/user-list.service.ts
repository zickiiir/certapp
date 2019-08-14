import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';
import { ListItem } from '../models/list-item.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: ListItem[] = [];

  constructor(
    private http: HttpClient
  ){}

  
}
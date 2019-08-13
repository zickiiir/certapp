import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { ListUser } from './list-user.model';

@Injectable()
export class UserService {
  usersChanged = new Subject<ListUser[]>();
  private users: ListUser[] = [];

  setUsers(users: ListUser[]){
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  getUsers(){
    return this.users.slice();
  }
}
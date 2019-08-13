import { Component, OnInit } from '@angular/core';
import { ListUser } from './list-user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: ListUser[];
  loaded = false;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http
      .get<ListUser[]>('https://private-anon-794a2b8884-certicon.apiary-mock.com/users')
      .subscribe(response => {
        this.users = response;
        this.loaded = true;
      });
  }

}

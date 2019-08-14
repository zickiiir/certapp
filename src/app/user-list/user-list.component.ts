import { Component, OnInit } from '@angular/core';
import { ListItem } from '../models/list-item.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user-list.service';
import { AuthGuard } from '../auth/auth.guard';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [AuthGuard]
})
export class UserListComponent implements OnInit {
  users: ListItem[];
  loaded = false;

  constructor(
    private http: HttpClient,
    private userListService: UserService
  ) { }

  ngOnInit() {
    this.loaded = false;
    this.http
      .get<ListItem[]>('https://private-anon-794a2b8884-certicon.apiary-mock.com/users')
      .subscribe(response => {
        this.users = response;
        this.loaded = true;
      });
  }

}

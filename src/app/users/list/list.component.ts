import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) {
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        console.log('USERS:', users);
        this.users = users;
      }
    );
  }

  ngOnInit() {
    this.getUsers();
  }

}

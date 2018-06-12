import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.scss' ]
})
export class ListComponent implements OnInit {
  users: User[];
  placeholderImage = 'http://placehold.it/100x100';

  constructor(private userService: UserService) {
  }

  getUsers():void {
    this.userService.getUsers().subscribe(users => this.users = users)
  }

  ngOnInit() {
    this.getUsers();
  }

}

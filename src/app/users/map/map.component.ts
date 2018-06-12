import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }

  getUsers():void {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      }
    )
  }

  ngOnInit() {
    this.getUsers();
  }

}

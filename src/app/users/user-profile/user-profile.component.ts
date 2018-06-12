import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user = new User();
  publicData = [
    {name: 'first_name', title: 'First Name'},
    {name: 'last_name', title: 'Last Name'},
    {name: 'username', title: 'Username'},
    {name: 'gender', title: 'Gender'},
    {name: 'email', title: 'Email'},
    {name: 'country', title: 'Country'},
    {name: 'city', title: 'City'},
  ];
  placeholderImage = 'http://placehold.it/100x100';

  constructor(private route: ActivatedRoute, private userService: UserService, private location: Location) { }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getUser();
  }

}

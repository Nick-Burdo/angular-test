import {Component, OnInit} from '@angular/core';
import {Profile} from '../../models/profile';
import {UserService} from '../../services/user.service';
import { Location } from '@angular/common';
import { v } from '@angular/core/src/render3';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile = new Profile();
  publicData = [
    {name: 'first_name', title: 'First Name'},
    {name: 'last_name', title: 'Last Name'},
    {name: 'username', title: 'Username', required: true},
    {name: 'gender', title: 'Gender', pattern: 'male|female'},
    {name: 'email', title: 'Email'},
    {name: 'image', title: 'Image'},
    {name: 'country', title: 'Country'},
    {name: 'city', title: 'City'},
  ];
  placeholderImage = 'http://placehold.it/100x100';

  constructor(private userService: UserService, private location: Location) { }

  getProfile(): void {
    this.userService.getCurrentUser().subscribe(
      profile => {
        this.profile = profile;
      }
    );
  }

  onSubmit():void{
    this.userService.updateCurrentUser(this.profile).subscribe(
      result => {
        console.log('User Updated', result);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getProfile();
  }
}

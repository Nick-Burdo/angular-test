import {Component, OnInit} from '@angular/core';
import {Profile} from '../profile';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile;

  constructor(private userService: UserService) {
  }

  getProfile(): void {
    this.userService.getCurrentUser().subscribe(
      profile => {

        console.log('CURRENT USER', profile);

        this.profile = profile;
      }
    );
  }

  ngOnInit() {
    this.getProfile();
  }
}

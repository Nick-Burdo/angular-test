import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;  // gmapElement is a reference to <div #gmap> inside template
  map: google.maps.Map;
  lat: number = 0;
  lon: number = 0;
  users: User[];

  constructor(private userService: UserService) { }

  getUsers():void {
    this.userService.getUsers().subscribe(
      users => {
        const markers: google.maps.Marker[] = [];
        let lat = 0;
        let lon = 0;
        this.users = users.map(user => {

          // TODO: fake user-s location
          user.lat = Math.random() * 5 + 47;
          user.lon = Math.random() * 10 + 25;

          lat += user.lat;
          lon += user.lon;
          const marker = new google.maps.Marker({
            position: {lat: user.lat, lng: user.lon},
            title: user.first_name || user.last_name ? `${user.first_name} ${user.last_name}` : user.username
          });
          markers.push(marker);
          return user;
        });
        lat /= users.length;
        lon /= users.length;
        this.initGmap(markers, lat, lon);
      }
    )
  }

  initGmap(markers: google.maps.Marker[], lat:number, lon: number): void {
    const mapProp = {
      center: new google.maps.LatLng(lat, lon),
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    markers.forEach(marker => marker.setMap(this.map));
  }

  ngOnInit() {
    this.getUsers();
  }
}

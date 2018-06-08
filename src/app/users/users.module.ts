import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UiModule } from '../ui/ui.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    HttpClientModule
  ],
  declarations: [ListComponent, MapComponent, UserProfileComponent]
})
export class UsersModule { }

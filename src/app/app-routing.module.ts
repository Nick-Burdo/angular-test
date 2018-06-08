import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListComponent } from './users/list/list.component';
import { MapComponent } from './users/map/map.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';
import { AuthGardService } from './services/auth-gard.service';
import { UserProfileComponent } from './users/user-profile/user-profile.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'list', component: ListComponent, canActivate: [ AuthGardService ]},
  {path: 'map', component: MapComponent, canActivate: [ AuthGardService ]},
  {path: 'profile/:id', component: UserProfileComponent, canActivate: [ AuthGardService ]},
  {path: 'profile', component: ProfileComponent, canActivate: [ AuthGardService ]},
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}

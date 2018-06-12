# Explorer

## Development sequence

### Create App

Create new Angular App with `SCSS` support and routing:
```
$ ng new explorer --style=scss --routing
$ cd explorer
```
Add `Bootstrap` & `FontAwesome`:
```
$ yarn add bootstrap font-awesome
```
Add import `Bootstrap` & `FontAwesome` styles:
```
// explorer/src/styles.scss 

@import "~bootstrap/dist/css/bootstrap.css";
@import "~font-awesome/css/font-awesome.css";
```

### Use Proxy

For correct recognize response errors of `http` requests we need use proxy.

Create `proxy.conf.json`:
```
{
  "/rest/*": {
    "target": "https://test-api.live.gbksoft.net",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true
  }
}
```

Add real API URL to the `src/environments/environment.ts` and `src/environments/environment.prod.ts`:
```
  apiUrl: 'https://test-api.live.gbksoft.net/rest/v1'
```

Create `src/environments/environment.dev.ts`:
```
export const environment = {
  production: false,
  apiUrl: '/rest/v1'
};
```

Set `development` environment in the `angular.json`:
```
  ...
  "projects": {
    ...
    "architect": {
      "build": {
        ...
        "configurations": {
          "production": {...},
          "development": {
            "fileReplacements": [
              {
                "replace": "src/environments/environment.ts",
                "with": "src/environments/environment.dev.ts"
              }
            ]
          }
        }
      },
      "serve": {
        ...
        "configurations": {
          "production": {...},
          "development": {
            "browserTarget": "explorer:build:development"
          }
        }
      },
      ...
```

Add parameters to `ng serve` in `start` script of `package,json`:
```
  "scripts": {
    "start": "ng serve  --proxy-config proxy.conf.json --configuration=development",
    ...
```

Now you can use the `environment.apiUrl` parameter in the `src/app/config.ts`:


### Create services

Create interceptor (`explorer/src/app/services/http-response-interceptor.ts`) for:
 - convert API response to appropriate data format
 - reconnize Error 401 & redirect to Login Form
 
Add interceptor as `provider` into `explorer/src/app/app.module.ts`

Generate `AuthService` & `AuthGardService`:
```
$ ng generate service services/auth
$ ng generate service services/auth-gard
```
Implement `AuthService` & `AuthGardService`

Create model `User` (`explorer/src/app/users/user.ts`)

Generate and implement `UserService`


### Create Layout

Generate `UiModule` with automatically import the in main `AppModule`:
```
$ ng generate module ui --module app.module
```
Generate 3 Components inside of the `UiModule`:
```
$ ng generate component ui/layout
$ ng generate component ui/header
$ ng generate component ui/footer
```
Implement the `LayoutComponent` Template (`explorer/src/app/ui/layout/layout.component.html`)

Export the `LayoutComponent`:
```
// explorer/src/app/ui/ui.module.ts

@NgModule({
  ...
  exports: [LayoutComponent]
})
```

Generate `PageNotFound` Component in the `UiModule`
```
$ ng generate component ui/page-not-found
```
Implement component's template inside the `<app-layout>` element



### Create Routing

Change content of `explorer/src/app/app.component.html`:
```
<router-outlet></router-outlet>
```

Implement main routes in the `explorer/src/app/app-routing.module.ts`




### Create List Page, Map Page & User-Profile Page

Generate `UsersModule` with automatically import the in main `AppModule` and `routing`:
```
$ ng generate module users --module app.module --routing
```
***NOTE:*** The parameter `--routing` prescribes to create and import `routing` file (`ui-routing.module.ts`). 
Without this, the `routerLink` directive will not work!

Generate 3 Components inside of the `UsersModule`:
```
$ ng generate component users/list
$ ng generate component ui/map
$ ng generate component ui/user-profile
```

Add component, link and `canActivated` property to each page route into main routes 
(`explorer/src/app/app-routing.module.ts`).

Imports `UiModule` in the `explorer/src/app/users/users.module.ts`
```
@NgModule({
  imports: [
    ...
    UiModule
  ],
  ...
})
```

Implement template's content of components, each must be inside the `<app-layout>` element

#### Inject Google Map

Install Google Maps types for typescript support.
```
$ yarn add @types/googlemaps
```

Link Google Maps JavaScript CDN inside `explorer/src/index.html`
```
<script src=”http://maps.googleapis.com/maps/api/js"></script>
```

Add a placeholder <div> for GMap inside `explorer/src/app/users/map/map.component.html`
```
<div #gmap style=”width:100%;height:400px”></div>
```

Implement Map Page component `explorer/src/app/users/map/map.component.ts`

### Create Login Page & Profile Page

Generate `AuthModule`:
```
$ ng generate module auth --module app.module --routing
```

Generate 2 components inside the `AuthModule`
```
$ ng generate component auth/login
$ ng generate component auth/profile
```

Add component and link to each page route into main routes. 
Add `canActivated` property to the Profile Page route 
(`explorer/src/app/app-routing.module.ts`).

#### Login via Facebook

Connect Facebook SDK in `src/index.html`:
```
  <script src="https://connect.facebook.net/en_US/sdk.js"></script>
```

Implement `init()`, `getStatus()` & `login()` functions of Facebook SDK
(`src/app/auth/login/login.component.ts`). 

Implement request login via Facebook to API (`explorer/src/app/services/auth.service.ts`).

#### Implement Templates

Import `UiModule` into the `AuthModule`.

Implement templates of components. Template's content of `ProfileComponent` must be inside the `<app-layout>` element














## Common

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

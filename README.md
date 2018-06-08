# Explorer

## Development sequence

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

Generate `UsersModule` with automatically import the in main `AppModule`:
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

Wrap content of `UserModule` component templates with `<app-layout></app-layout>`

Change content of `explorer/src/app/app.component.html`:
```
<router-outlet></router-outlet>
```

Generate `PageNotFound` Component in the `UiModule`
```
$ ng generate component ui/page-not-found
```

Set main routes in the `explorer/src/app/app-routing.module.ts`

Generate `AuthModule`:
```
$ ng generate module auth --module app.module --routing
```
Generate 2 components inside the `AuthModule`
```
$ ng generate component auth/login
$ ng generate component auth/profile
```

Import `UiModule` into the `AuthModule` and wrap template's content of `ProfileComponent` 
to `<app-layout>` element.

Add `LoginComponent`, `ProfileComponent` and their links into main routes 
(`explorer/src/app/app-routing.module.ts`)

Generate `AuthService` & `AuthGardService`:
```
$ ng generate service services/auth
$ ng generate service services/auth-gard
```
Implement `AuthService` & `AuthGardService`

Add property `canActivated` to the "Authorize Zone" of main routes 
(`explorer/src/app/app-routing.module.ts`)

Implement `LoginComponent` 

Create model `User` (`explorer/src/app/users/user.ts`)

Generate and implement `UserService`

Create interceptor for convert API response to appropriate data format for User model
(`explorer/src/app/services/http-response-interceptor.ts`).

Add interceptor as `provider` into `explorer/src/app/app.module.ts`














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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthRegisterComponent} from "./auth-register/auth-register.component";
import {AuthLoginComponent} from "./auth-login/auth-login.component";

const routes: Routes = [
  {
    path: 'register',
    component: AuthRegisterComponent
  },
  {
    path: 'login',
    component: AuthLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

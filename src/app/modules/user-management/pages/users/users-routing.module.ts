import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {UserFormComponent} from "./user-form/user-form.component";
import {AccountSettingComponent} from "./account-setting/account-setting.component";
import {RoleGuardGuard} from "../../../../core/guards/role/role-guard.guard";
import {AuthGuardGuard} from "../../../../core/guards/auth/auth-guard.guard";

const routes: Routes = [
    {
        path: 'list',
        component: UserListComponent,
        canActivate: [RoleGuardGuard],
        data: { expectedRoles: ['ADMIN'] }
    },
    {
      path: 'new-user',
      component: UserFormComponent,
      canActivate: [RoleGuardGuard],
      data: { expectedRoles: ['ADMIN'] }
    },
    {
      path: 'edit-user/:id',
      component: UserFormComponent,
      canActivate: [RoleGuardGuard],
      data: { expectedRoles: ['ADMIN'] }
    },
    {
      path: 'account-setting',
      component: AccountSettingComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

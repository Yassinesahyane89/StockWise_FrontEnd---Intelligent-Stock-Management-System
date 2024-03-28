import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardGuard} from "../../core/guards/auth/auth-guard.guard";
import {RoleGuardGuard} from "../../core/guards/role/role-guard.guard";

const routes: Routes = [
    {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuardGuard],
    },
    {
        path: 'roles',
        loadChildren: () => import('./pages/roles/roles.module').then(m => m.RolesModule),
        canActivate: [AuthGuardGuard,RoleGuardGuard],
        data: { expectedRoles: ['ADMIN'] }
    },
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }

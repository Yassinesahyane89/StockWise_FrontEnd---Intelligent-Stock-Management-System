import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { CustomToastrComponent } from './shared/components/custom-toastr/custom-toastr.component';
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {AuthGuardGuard} from "./core/guards/auth/auth-guard.guard";
import {RoleGuardGuard} from "./core/guards/role/role-guard.guard";
const appRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'user-management',
    loadChildren: () => import('./modules/user-management/user-management-routing.module').then(m => m.UserManagementRoutingModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./modules/inventory/inventory-routing.module').then(m => m.InventoryRoutingModule),
    canActivate: [AuthGuardGuard, RoleGuardGuard],
    data: { expectedRoles: ['ADMIN', 'MANAGER'] }
  },
  {
    path: 'authentication',
    loadChildren: () => import('./main/pages/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: '',
    redirectTo: '/user-management/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [AppComponent, CustomToastrComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    SampleModule,
    ContentHeaderModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

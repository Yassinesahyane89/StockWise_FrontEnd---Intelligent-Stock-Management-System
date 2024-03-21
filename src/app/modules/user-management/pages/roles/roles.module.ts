import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import {RoleListComponent} from "./role-list/role-list.component";
import {RoleFormComponent} from "./role-form/role-form.component";
import {CoreDirectivesModule} from "../../../../../@core/directives/directives";
import {CorePipesModule} from "../../../../../@core/pipes/pipes.module";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {ContentHeaderModule} from "../../../../layout/components/content-header/content-header.module";


@NgModule({
  declarations: [
      RoleListComponent,
      RoleFormComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    CoreDirectivesModule,
    CorePipesModule,
    FormsModule,
    NgSelectModule,
    NgbDropdownModule,
    NgxDatatableModule,
    ContentHeaderModule
  ]
})
export class RolesModule { }

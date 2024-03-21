import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Ng2FlatpickrModule } from "ng2-flatpickr";


import {ContentHeaderModule} from "../../../../layout/components/content-header/content-header.module";
import {CoreDirectivesModule} from "../../../../../@core/directives/directives"

import { WarrantyRoutingModule } from './warranty-routing.module';
import {WarrantyListComponent} from "./warranty-list/warranty-list.component";
import {WarrantyFormComponent} from "./warranty-form/warranty-form.component";


@NgModule({
  declarations: [
      WarrantyListComponent,
      WarrantyFormComponent
  ],
  imports: [
    CommonModule,
    WarrantyRoutingModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    NgxDatatableModule,
    Ng2FlatpickrModule,
    ContentHeaderModule,
    CoreDirectivesModule,
    ReactiveFormsModule
  ]
})
export class WarrantyModule { }

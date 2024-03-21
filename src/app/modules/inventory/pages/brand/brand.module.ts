import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Ng2FlatpickrModule } from "ng2-flatpickr";


import {ContentHeaderModule} from "../../../../layout/components/content-header/content-header.module";
import {CoreDirectivesModule} from "../../../../../@core/directives/directives"

import { BrandRoutingModule } from './brand-routing.module';
import { BrandFormComponent } from './brand-form/brand-form.component';
import { BrandListComponent } from './brand-list/brand-list.component';


@NgModule({
  declarations: [
    BrandFormComponent,
    BrandListComponent
  ],
  imports: [
    CommonModule,
    BrandRoutingModule,
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
export class BrandModule { }

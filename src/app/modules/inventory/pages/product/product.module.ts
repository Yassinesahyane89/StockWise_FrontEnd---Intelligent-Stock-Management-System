import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Ng2FlatpickrModule } from "ng2-flatpickr";


import {ContentHeaderModule} from "../../../../layout/components/content-header/content-header.module";
import {CoreDirectivesModule} from "../../../../../@core/directives/directives"

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
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
export class ProductModule { }

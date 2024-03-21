import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Ng2FlatpickrModule } from "ng2-flatpickr";

import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { SubCategoryFormComponent } from './sub-category-form/sub-category-form.component';
import {ContentHeaderModule} from "../../../../layout/components/content-header/content-header.module";
import {CoreDirectivesModule} from "../../../../../@core/directives/directives";

@NgModule({
  declarations: [
    SubCategoryListComponent,
    SubCategoryFormComponent

  ],
  imports: [
    CommonModule,
    SubCategoryRoutingModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    NgxDatatableModule,
    Ng2FlatpickrModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    CoreDirectivesModule
  ]
})
export class SubCategoryModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import {CoreDirectivesModule} from "../../../../../@core/directives/directives";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";

import { UnitRoutingModule } from './unit-routing.module';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitFormComponent } from './unit-form/unit-form.component';
import {ContentHeaderModule} from "../../../../layout/components/content-header/content-header.module";


@NgModule({
  declarations: [
    UnitListComponent,
    UnitFormComponent
  ],
    imports: [
        CommonModule,
        UnitRoutingModule,
        CoreDirectivesModule,
        FormsModule,
        NgbModule,
        NgSelectModule,
        NgbDropdownModule,
        NgxDatatableModule,
        Ng2FlatpickrModule,
        ReactiveFormsModule,
        ContentHeaderModule
    ]
})
export class UnitModule { }

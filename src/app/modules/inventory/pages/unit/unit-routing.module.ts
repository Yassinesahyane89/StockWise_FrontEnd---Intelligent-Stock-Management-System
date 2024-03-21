import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UnitListComponent} from "./unit-list/unit-list.component";
import {UnitFormComponent} from "./unit-form/unit-form.component";

const routes: Routes = [
  {
    path: 'list',
    component: UnitListComponent
  },
  {
    path: 'new-unit',
    component: UnitFormComponent
  },
  {
    path: 'edit-unit/:id',
    component: UnitFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitRoutingModule { }

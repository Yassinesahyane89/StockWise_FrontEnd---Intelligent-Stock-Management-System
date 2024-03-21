import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WarrantyListComponent} from "./warranty-list/warranty-list.component";
import {WarrantyFormComponent} from "./warranty-form/warranty-form.component";

const routes: Routes = [
  {
    path: 'list',
    component: WarrantyListComponent
  },
  {
      path: 'new-warranty',
      component: WarrantyFormComponent
  },
  {
      path: 'edit-warranty/:id',
      component: WarrantyFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarrantyRoutingModule { }

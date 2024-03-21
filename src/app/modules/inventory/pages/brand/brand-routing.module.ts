import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrandListComponent} from "./brand-list/brand-list.component";
import {BrandFormComponent} from "./brand-form/brand-form.component";

const routes: Routes = [
  {
    path: 'list',
    component: BrandListComponent
  },
  {
    path: 'new-brand',
    component: BrandFormComponent
  },
  {
    path: 'edit-brand/:id',
    component: BrandFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryListComponent} from "./category-list/category-list.component";
import {CategoryFormComponent} from "./category-form/category-form.component";

const routes: Routes = [
    {
        path: 'list',
        component: CategoryListComponent
    },
    {
        path: 'new-category',
        component: CategoryFormComponent
    },
    {
        path: 'edit-category/:id',
        component: CategoryFormComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }

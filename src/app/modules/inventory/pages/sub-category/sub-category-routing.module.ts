import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { SubCategoryFormComponent } from './sub-category-form/sub-category-form.component';

const routes: Routes = [
    {
      path: 'list',
      component: SubCategoryListComponent
    },
    {
        path: 'new-sub-category',
        component: SubCategoryFormComponent
    },
    {
        path: 'edit-sub-category/:id',
        component: SubCategoryFormComponent
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoryRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'product',
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
    },
    {
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule)
    },
    {
        path: 'sub-category',
        loadChildren: () => import('./pages/sub-category/sub-category.module').then(m => m.SubCategoryModule)
    },
    {
        path: 'brand',
        loadChildren: () => import('./pages/brand/brand.module').then(m => m.BrandModule)
    },
    {
        path: 'unit',
        loadChildren: () => import('./pages/unit/unit.module').then(m => m.UnitModule)
    },
    {
        path: 'warranty',
        loadChildren: () => import('./pages/warranty/warranty.module').then(m => m.WarrantyModule)
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }

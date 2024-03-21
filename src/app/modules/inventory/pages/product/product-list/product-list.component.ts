import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'app/core/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {
    // initial value
    public contentHeader: object;

    public selectedOption = 10;

    public rows;

    public ColumnMode = ColumnMode;

    public selectCategory = [
      { id: 1, name: 'Electronics' , value: 'electronics'},
      { id: 2, name: 'Clothes' , value: 'clothes'},
      { id: 3, name: 'Grocery' , value: 'grocery'},
      { id: 4, name: 'Furniture' , value: 'furniture'}
    ];

    public selectSubCategory = [
      { id: 1, name: 'Mobile' , value: 'mobile', category: 'electronics'},
      { id: 2, name: 'Laptop' , value: 'laptop', category: 'electronics'},
      { id: 3, name: 'Shirt' , value: 'shirt', category: 'clothes'},
      { id: 4, name: 'Pant' , value: 'pant', category: 'clothes'},
      { id: 5, name: 'Rice' , value: 'rice', category: 'grocery'},
      { id: 6, name: 'Dal' , value: 'dal', category: 'grocery'},
      { id: 7, name: 'Bed' , value: 'bed', category: 'furniture'},
      { id: 8, name: 'Sofa' , value: 'sofa', category: 'furniture'}
    ];

    public selectBrand = [
      { id: 1, name: 'Samsung' , value: 'samsung', category: 'mobile'},
      { id: 2, name: 'Apple' , value: 'apple', category: 'mobile'},
      { id: 3, name: 'Dell' , value: 'dell', category: 'laptop'},
      { id: 4, name: 'HP' , value: 'hp', category: 'laptop'},
      { id: 5, name: 'Raymond' , value: 'raymond', category: 'shirt'},
      { id: 6, name: 'Peter England' , value: 'peter_england', category: 'shirt'},
      { id: 7, name: 'Levis' , value: 'levis', category: 'pant'},
      { id: 8, name: 'Wrangler' , value: 'wrangler', category: 'pant'},
      { id: 9, name: 'Daawat' , value: 'daawat', category: 'rice'},
      { id: 10, name: 'India Gate' , value: 'india_gate', category: 'rice'},
      { id: 11, name: 'Toor Dal' , value: 'toor_dal', category: 'dal'},
      { id: 12, name: 'Moong Dal' , value: 'moong_dal', category: 'dal'},
      { id: 13, name: 'Godrej' , value: 'godrej', category: 'bed'},
      { id: 14, name: 'Durian' , value: 'durian', category: 'bed'},
      { id: 15, name: 'Urban Ladder' , value: 'urban_ladder', category: 'sofa'},
      { id: 16, name: 'Pepperfry' , value: 'pepperfry', category: 'sofa'}
    ];


    // selected values
    public selectedCategory = [];
    public selectedSubCategory = [];
    public selectedBrand = [];
    public searchValue = '';
    constructor(
      private toastr: ToastrService,
      private productService: ProductService
    ) { }

    // handle success case
    handleSuccess(response) {

      // show toast
      this.toastr.success(response.message, 'User', {
        progressBar: true,
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });
    }

    // handle error case
    handleError(error) {
      // show toast
      this.toastr.error(error.error.message, 'User', {
        progressBar: true,
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });
    }

    // filter by category
    filterByCategory($event: any) {

    }

    // filter by sub category
    filterBySubCategory($event: any) {

    }

    // filter by brand
    filterByBrand($event: any) {
    }

    // filter by search
    filterUpdate($event: KeyboardEvent) {

    }

    // get all products
    getProducts() {
        this.productService.getProducts().subscribe((response: any) => {
          this.rows = response.data;
          console.log(this.rows);
        }, (error) => {
          this.handleError(error);
        });
    }

    // delete product
    deleteProduct(id) {
        this.productService.deleteProduct(id).subscribe((response: any) => {
          this.getProducts();
        }, (error) => {
          this.handleError(error);
        });
    }

    ngOnInit(): void {
        this.getProducts();
    }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { ToastrService } from 'ngx-toastr';
import { SubCategoryService } from 'app/core/services/sub-category/sub-category.service';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubCategoryListComponent implements OnInit {
    public contentHeader: object;

    public selectedOption = 10;

    public rows;

    public ColumnMode = ColumnMode;

    public selectDateCreated: any = [
      { id: 1, name: 'Today' , value: 'today'},
      { id: 2, name: 'Yesterday' , value: 'yesterday'},
      { id: 3, name: 'Last 7 Days' , value: 'last_7_days'},
      { id: 4, name: 'Last 30 Days' , value: 'last_30_days'}
    ];

    public selectStatus: any = [
      { id: 1, name: 'Active' , value: 'active'},
      { id: 2, name: 'Inactive' , value: 'inactive'}
    ];

    public selectCategory: any = [
      { id: 1, name: 'Category 1' , value: 'category_1'},
      { id: 2, name: 'Category 2' , value: 'category_2'},
      { id: 3, name: 'Category 3' , value: 'category_3'},
      { id: 4, name: 'Category 4' , value: 'category_4'}
    ];

    // selected values
    public selectedDateCreated = [];
    public selectedStatus = [];
    public selectedCategory = [];
    public searchValue = '';

    constructor(
      private toastr: ToastrService,
      private subCategoryService: SubCategoryService
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

    filterByDateCreated($event: any) {
        console.log (this.selectedDateCreated);
    }

    filterByStatus($event: any) {

    }

    filterByCategory($event: any) {

    }

    filterUpdate($event: KeyboardEvent) {

    }

    // get all sub categories
    getSubCategories() {
        this.subCategoryService.getAllSubCategories().subscribe(
        (response: any) => {
            this.rows = response.data;
        },
        (error: any) => {
            this.handleError(error);
        }
        );
    }

    deleteSubCategory(id) {
        this.subCategoryService.deleteSubCategory(id).subscribe(
            (response: any) => {
                this.getSubCategories();
                this.handleSuccess(response);
            },
            (error: any) => {
                this.handleError(error);
            }
        );
    }

    ngOnInit(): void {
      this.getSubCategories();
    }
}
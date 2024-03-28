import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
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

    // Decorator
    @ViewChild(DatatableComponent) table: DatatableComponent;

    // Private
    private tempData = [];

    // selected values
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

    filterByCategory($event: any) {

    }

    filterUpdate(event) {
        // Reset ng-select on search

        const val = event.target.value.toLowerCase();

        // Filter Our Data
        const temp = this.tempData.filter(function (d) {
            return d.categoryName.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // Update The Rows
        this.rows = temp;
        // Whenever The Filter Changes, Always Go Back To The First Page
        this.table.offset = 0;
    }

    // get all sub categories
    getSubCategories() {
        this.subCategoryService.getAllSubCategories().subscribe(
        (response: any) => {
            this.rows = response.data;
            this.tempData = this.rows;
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
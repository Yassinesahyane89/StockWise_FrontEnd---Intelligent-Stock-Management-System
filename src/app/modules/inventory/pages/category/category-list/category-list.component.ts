import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'app/core/services/category/category.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryListComponent implements OnInit {

  // initial value
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


  // selected values
  public searchValue = '';

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // Private
  private tempData = [];


  constructor(
    private toastr: ToastrService,
    private categoryService: CategoryService
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

  }

  filterByStatus($event: any) {

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

  // get all categories
    getCategories() {
        this.categoryService.getCategories().subscribe((response: any) => {
          this.rows = response.data;
          this.tempData=this.rows;
        }, (error) => {
          this.handleError(error);
        }
      );
    }

    // delete category
    deleteCategory(id) {
        this.categoryService.deleteCategory(id).subscribe((response: any) => {
            this.handleSuccess(response);
            this.getCategories();
        }, (error) => {
          this.handleError(error);
        }
      );
    }

  ngOnInit(): void {
    this.getCategories();
  }
}

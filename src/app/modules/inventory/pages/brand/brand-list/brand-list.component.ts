import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'app/core/services/brand/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BrandListComponent implements OnInit {
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

    public selectStatus: any = [
      { id: 0, name: 'All' , value: ''},
      { id: 1, name: 'Active' , value: 'ACTIVE'},
      { id: 2, name: 'Inactive' , value: 'INACTIVE'}
    ];

    // selected values
    public selectedDateCreated = [];
    public selectedStatus = [];
    public searchValue = '';

    // Decorator
    @ViewChild(DatatableComponent) table: DatatableComponent;

    // Private
    private tempData = [];

    constructor(
      private toastr: ToastrService,
      private brandService: BrandService
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

    filterByStatus(event: any) {
        if(event.value === null || event.value === '' || event.value === undefined) {
            return this.getBrands();
        }else {
            this.brandService.filterByStatus(event.value).subscribe((response: any) => {
                this.rows = response.data;
            }, error => {
                this.handleError(error);
            });
        }
    }

    filterUpdate(event) {
        // Reset ng-select on search
        this.selectedStatus = this.selectStatus[0];

        const val = event.target.value.toLowerCase();

        // Filter Our Data
        const temp = this.tempData.filter(function (d) {
            return d.brand.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // Update The Rows
        this.rows = temp;
        // Whenever The Filter Changes, Always Go Back To The First Page
        this.table.offset = 0;
    }

    // get all brands
    getBrands() {
        this.brandService.getBrands().subscribe(
        (response: any) => {
            this.rows = response.data;
            this.tempData = this.rows;
        },
        (error: any) => {
            this.handleError(error);
        }
        );
    }

    // delete brand
    deleteBrand(id) {
        this.brandService.deleteBrand(id).subscribe(
            (response: any) => {
                this.getBrands();
                this.handleSuccess(response);
            },
            (error: any) => {
                this.handleError(error);
            }
        );
    }

    ngOnInit(): void {
      this.getBrands()
    }
}

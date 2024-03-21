import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
      { id: 1, name: 'Active' , value: 'active'},
      { id: 2, name: 'Inactive' , value: 'inactive'}
    ];

    // selected values
    public selectedDateCreated = [];
    public selectedStatus = [];
    public searchValue = '';
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

    filterByDateCreated($event: any) {

    }

    filterByStatus($event: any) {

    }

    filterUpdate($event: KeyboardEvent) {
    }

    // get all brands
    getBrands() {
        this.brandService.getBrands().subscribe(
        (response: any) => {
            this.rows = response.data;
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

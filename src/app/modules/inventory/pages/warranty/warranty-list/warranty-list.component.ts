import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';

import {ToastrService} from 'ngx-toastr';
import {WarrantyService} from 'app/core/services/warranty/warranty.service';

@Component({
  selector: 'app-warranty-list',
  templateUrl: './warranty-list.component.html',
  styleUrls: ['./warranty-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WarrantyListComponent implements OnInit {
  // initial value
  public contentHeader: object;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public rows;
  public temp = [];
  public previousStatusFilter = '';

  public selectStatus: any = [
    { name: 'All', value: '' },
    { name: 'Active', value: 'ACTIVE' },
    { name: 'Inactive', value: 'INACTIVE' }
  ];

  // selected values
  public selectedStatus = [];
  public searchValue = '';

  // Private
  private tempData = [];

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private toastr: ToastrService,
    private warrantyService: WarrantyService
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

    // filterUpdate
    filterUpdate(event) {
      // Reset ng-select on search
      this.selectedStatus = this.selectStatus[0];

      const val = event.target.value.toLowerCase();

      // Filter Our Data
      const temp = this.tempData.filter(function (d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      });

      // Update The Rows
      this.rows = temp;
      // Whenever The Filter Changes, Always Go Back To The First Page
      this.table.offset = 0;
    }

  // Filter Rows
  filterRows(statusFilter): any[] {
    // Reset search on select change
    this.searchValue = '';

    statusFilter = statusFilter.toLowerCase();

    return this.tempData.filter(row => {
      return row.status.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
    });
  }

    // get all warranty
    getAllWarranty() {
      this.warrantyService.getAllWarranty().subscribe((response:any) => {
          this.rows = response.data;
          this.tempData = this.rows;
      }, error => {
        this.handleError(error);
      });
    }

  filterByStatus(event: any) {
    if(event.value === null || event.value === '' || event.value === undefined) {
        return this.getAllWarranty();
    }else {
        this.warrantyService.filterByStatus(event.value).subscribe((response: any) => {
          this.rows = response.data;
          this.tempData = this.rows;
        }, error => {
          this.handleError(error);
        });
    }
  }

    // delete warranty
    deleteWarranty(id) {
      this.warrantyService.deleteWarranty(id).subscribe((response:any) => {
        this.handleSuccess(response);
        this.getAllWarranty();
      }, error => {
        this.handleError(error);
      });
    }

    ngOnInit(): void {
       this.getAllWarranty()
    }
}

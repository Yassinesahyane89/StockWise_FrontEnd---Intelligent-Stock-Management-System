import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';

import {ToastrService} from 'ngx-toastr';
import {UnitService} from "../../../../../core/services/unit/unit.service";

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UnitListComponent implements OnInit {
    // initial value
    public rows;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
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

    // Decorator
    @ViewChild(DatatableComponent) table: DatatableComponent;

    // Private
    private tempData = [];

    constructor(
      private toastr: ToastrService,
      private unitService: UnitService
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
            return d.unitName.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // Update The Rows
        this.rows = temp;
        // Whenever The Filter Changes, Always Go Back To The First Page
        this.table.offset = 0;
    }

    // Filter By Status
    filterByStatus(event) {
        console.log(event);
        if(event.value === null || event.value === '' || event.value === undefined) {
            return this.getAllUnits();
        }else {
            this.unitService.filterByStatus(event.value).subscribe((response: any) => {
                this.rows = response.data;
                this.tempData = this.rows;
            }, error => {
                this.handleError(error);
            });
        }
    }

    // get all units
    getAllUnits() {
      this.unitService.getAllUnits().subscribe((response: any) => {
        this.rows = response.data;
        this.tempData = this.rows;
      }, (error) => {
        this.handleError(error);
      });
    }

    // delete unit
    deleteUnit(id) {
      this.unitService.deleteUnit(id).subscribe((response: any) => {
        this.handleSuccess(response);
        this.getAllUnits();
      }, (error) => {
        this.handleError(error);
      });
    }

    ngOnInit(): void {
      this.getAllUnits();
    }
}

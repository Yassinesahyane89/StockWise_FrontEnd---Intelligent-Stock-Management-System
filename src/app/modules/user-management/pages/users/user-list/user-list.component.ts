import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import {UsersService} from "../../../../../core/services/users/users.service";

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
    // Public
    public rows;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    public temp = [];
    public previousRoleFilter = '';
    public previousStatusFilter = '';

    public selectRole: any = [
      { name: 'All', value: '' },
      { name: 'Admin', value: 'ADMIN' },
      { name: 'Manager', value: 'MANAGER' },
      { name: 'User', value: 'USER' }
    ];

    public selectStatus: any = [
      { name: 'All', value: '' },
      { name: 'Deleted', value: 'DELETED' },
      { name: 'Active', value: 'ACTIVE' },
      { name: 'Inactive', value: 'INACTIVE' }
    ];

    public selectedRole = [];
    public selectedStatus = [];
    public searchValue = '';

    // Decorator
    @ViewChild(DatatableComponent) table: DatatableComponent;

    // Private
    private tempData = [];

    // Constructor
    constructor(
        private userService: UsersService,
        private toastr: ToastrService
    ) {}

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
      this.selectedRole = this.selectRole[0];
      this.selectedStatus = this.selectStatus[0];

      const val = event.target.value.toLowerCase();

      // Filter Our Data
      const temp = this.tempData.filter(function (d) {
        return d.fullName.toLowerCase().indexOf(val) !== -1 || !val;
      });

      // Update The Rows
      this.rows = temp;
      // Whenever The Filter Changes, Always Go Back To The First Page
      this.table.offset = 0;
    }

    // Filter By Roles
    filterByRole(event) {
      const filter = event ? event.value : '';
      this.previousRoleFilter = filter;
      this.temp = this.filterRows(filter, this.previousStatusFilter);
      this.rows = this.temp;
    }

    // Filter By Status
    filterByStatus(event) {
        console.log(event);
      const filter = event ? event.value : '';
      this.previousStatusFilter = filter;
      this.temp = this.filterRows(this.previousRoleFilter,filter);
      this.rows = this.temp;
    }

    // Filter Rows
    filterRows(roleFilter, statusFilter): any[] {
      // Reset search on select change
      this.searchValue = '';

      roleFilter = roleFilter.toLowerCase();
      statusFilter = statusFilter.toLowerCase();

      return this.tempData.filter(row => {
        const isPartialNameMatch = row.roleName.toLowerCase().indexOf(roleFilter) !== -1 || !roleFilter;
        const isPartialStatusMatch = row.status.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
        return isPartialNameMatch && isPartialStatusMatch;
      });
    }

    // get all user
    getUsers() {
        this.userService.getUsers().subscribe((response: any) => {
              this.rows = response.data;
              this.tempData = this.rows;
        });
    }

    // On init
    ngOnInit(): void {
      this.getUsers();
    }

    // On destroy
    ngOnDestroy(): void {
    }

    // delete user
    deleteUser(id: number) {
        this.userService.deleteUser(id)
            .subscribe(
                (response: any) => {
                            this.handleSuccess(response);
                            this.getUsers();
                          }, (error) => {
                            this.handleError(error);
                          }
                      );
    }
}

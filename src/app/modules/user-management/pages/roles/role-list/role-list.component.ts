import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { ToastrService } from 'ngx-toastr';
import {RolesService} from "../../../../../core/services/roles/roles.service";

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RoleListComponent implements OnInit {
    // Public
    public rows;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    public temp = [];
    public searchValue = '';
    constructor(
        private roleService: RolesService,
        private toastr: ToastrService,
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

    //get all roles
    getAllRoles() {
        this.roleService.getAllRoles().subscribe((response: any) => {
            this.rows = response.data;
            this.temp = this.rows;
        });
    }

    // delete role
    deleteRole(row) {
        this.roleService.deleteRole(row.id).subscribe((response: any) => {
            this.handleSuccess(response);
            this.getAllRoles();
        }, (error) => {
            this.handleError(error);
        });
    }

    // search method
    filterUpdate($event: KeyboardEvent) {

    }

    ngOnInit(): void {
        this.getAllRoles();
    }
}

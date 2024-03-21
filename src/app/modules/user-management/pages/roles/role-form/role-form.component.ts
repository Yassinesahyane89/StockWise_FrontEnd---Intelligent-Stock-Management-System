import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


import {RolesService} from "../../../../../core/services/roles/roles.service";
import {ToastrService} from "ngx-toastr";
import {RoleRequest} from "../../../../../shared/models/request/role-request.model";
import {UserReq} from "../../../../../shared/models/request/user-req.model";

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoleFormComponent implements OnInit {

    // public
    public roleRequest: RoleRequest = {} as RoleRequest;
    public pageType: string;
    public pageTitle: string;
    public roleID: number;
    public contentHeader: object;
    public checked = true;

    // constructor
    constructor(
        private roleService: RolesService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    // handle success case
    handleSuccess(response,form) {
      // redirect to user list /user-management/users/list
      this.router.navigate(['/user-management/roles/list']);

      // show toast
      this.toastr.success(response.message, 'Success', {
        progressBar: true,
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });

      //form.reset();
      form.reset();
      this.roleRequest = {} as RoleRequest;
    }

    // handle error case
    handleError(error,form) {
      if (error.error && error.error.message) {
        // show toast
        this.toastr.error(error.error.message, 'Error', {
          progressBar: true,
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
      }else if (error && error.error) {
        const validationErrors = error.error;

        Object.keys(validationErrors).forEach((key) => {
          const control = form.controls[key];
          if (control) {
            control.setErrors({serverError: validationErrors[key].join(', ')});
          }
        });
      }
    }

    // add new role
    addNewRole(form) {
      this.roleService.createRole(this.roleRequest).
      subscribe(
        (response: any) => {
          this.handleSuccess(response,form);
        },(error) => {
          this.handleError(error,form);
        }
      );
    }

    // update role
    updateRole(form) {
      this.roleService.updateRole(this.roleID, this.roleRequest).
      subscribe(
        (response: any) => {
          this.handleSuccess(response,form);
        },(error) => {
          this.handleError(error,form);
        }
      );
    }

    // get role by id
    getRoleById() {
        this.roleService.getRoleById(this.roleID)
            .subscribe(
                (response: any) => {
                    console.log(response.data);
                    this.roleRequest = response.data;
                    console.log("=====================")
                    console.log(this.roleRequest);
                }, (error) => {
                    this.router.navigate(['/user-management/roles/list']);
                }
            );
    }

    //init form
    initForm() {
      this.roleService.initForm()
        .subscribe(
            (response: any) => {
                console.log(response);
                this.roleRequest = response.data;
            }, (error) => {
                console.log(error);
            }
        );
    }

    // check page type
    checkPageType() {
        if(window.location.href.indexOf('new-role') > -1) {
            this.pageType = 'new';
            this.pageTitle = 'Add New Role';
            this.initForm();
        }else {
            this.roleID = + (this.route.snapshot.paramMap.get('id'));
            this.getRoleById();
            this.pageType = 'edit';
            this.pageTitle = 'Edit Role';
        }
    }

    // role form submitted
    roleFomrSubmitted(RoleForm: any) {
      if (RoleForm.valid) {
        if (this.pageType === 'new') {
          this.addNewRole(RoleForm);
        } else {
          this.updateRole(RoleForm);
        }
      }
    }

    ngOnInit(): void {
        // check page type
        this.checkPageType();

        // content header
        this.contentHeader = {
          headerTitle: this.pageTitle,
          actionButton: true,
          breadcrumb: {
            type: '',
            links: [
              {
                name: 'Home',
                isLink: true,
                link: '/'
              },
              {
                name: 'Roles',
                isLink: true,
                link: '/user-management/roles/list'
              },
              {
                name: this.pageTitle,
                isLink: false
              }
            ]
          }
        };
    }
}

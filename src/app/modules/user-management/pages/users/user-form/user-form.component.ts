import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {UsersService} from "../../../../../core/services/users/users.service";
import {UserReq} from "../../../../../shared/models/request/user-req.model";

import { ToastrService } from 'ngx-toastr';
@Component({
      selector: 'app-user-form',
      templateUrl: './user-form.component.html',
      styleUrls: ['./user-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserFormComponent  implements OnInit {
    userReq: UserReq = {} as UserReq;
    pageType: string;
    pageTitle: string;
    userID: number;

    // public
    public contentHeader: object;

    constructor(
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private usersService: UsersService) {}

    // handle success case
    handleSuccess(response,form) {
        // redirect to user list /user-management/users/list
        this.router.navigate(['/user-management/users/list']);

        // show toast
        this.toastr.success(response.message, 'Progress Bar', {
            progressBar: true,
            toastClass: 'toast ngx-toastr',
            closeButton: true
        });

        //form.reset();
        form.reset();
        this.userReq = {} as UserReq;
    }

    // handle error case
    handleError(error,form) {
        if (error.error && error.error.message) {
            // show toast
            this.toastr.error(error.error.message, 'Progress Bar', {
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

    // add user
    addUser(UserForm: any) {
        this.usersService.createUser(this.userReq)
            .subscribe(
                (response: any) => {
                    this.handleSuccess(response,UserForm);
                }, (error) => {
                    this.handleError(error,UserForm);
                }
            );
    }

    // update user
    updateUser(UserForm: any) {
        this.usersService.updateUser(this.userID, this.userReq)
            .subscribe(
                (response: any) => {
                    this.handleSuccess(response,UserForm);
                }, (error) => {
                    this.handleError(error,UserForm);
                }
            );
    }

    // get user by id
    getUserById() {
        this.usersService.getUser(this.userID)
            .subscribe(
                (response: any) => {
                        this.userReq = response.data;
                    }, (error) => {
                        this.router.navigate(['/user-management/users/list']);
                    }
            );
    }

    // check page type
    checkPageType() {
        if(window.location.href.indexOf('new-user') > -1) {
            this.pageType = 'new';
            this.pageTitle = 'Add New User';
        }else {
            this.userID = + (this.route.snapshot.paramMap.get('id'));
            this.getUserById();
            this.pageType = 'edit';
            this.pageTitle = 'Edit User';
        }
    }
    ngOnInit() {
        // check page type
        this.checkPageType();

        // fake data
        this.userReq = {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@gmail.com',
            status: 'ACTIVE',
        }

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
                name: 'users',
                isLink: true,
                link: '/user-management/users/list'
              },
              {
                name: this.pageTitle,
                isLink: false
              }
            ]
          }
        };
    }

    userFomrSubmitted(UserForm: any) {
        if(this.pageType === 'new') {
            this.addUser(UserForm);
        }else {
            this.updateUser(UserForm);
        }
    }
}
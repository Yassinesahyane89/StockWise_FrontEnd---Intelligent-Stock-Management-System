import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {UserReq} from "../../../../../shared/models/request/user-req.model";
import {AuthService} from "../../../../../core/services/auth/auth.service";
import {AuthResponse} from "../../../../../shared/models/response/auth-response.model";
import {ProfileService} from "../../../../../core/services/profile/profile.service";
import {ProfileRequest} from "../../../../../shared/models/response/profile-request.model";
import {ChangePasswordRequest} from "../../../../../shared/models/response/change-password-request.model";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AccountSettingComponent implements OnInit {
    // public
    public userReq: any = {} as UserReq;
    public authResponse: any = {} as AuthResponse;
    public profileRequest: any = {} as ProfileRequest;
    public changePasswordRequest: any = {} as ChangePasswordRequest;
    public contentHeader: object;
    public data: any;
    public passwordTextTypeOld = false;
    public passwordTextTypeNew = false;
    public passwordTextTypeRetype = false;
    public avatarImage: string;

    // Constructor
    constructor(
        private toastr: ToastrService,
        private authService: AuthService,
        private profileService: ProfileService,
        private route: Router,
    ) {}

    // handle success case
    handleSuccess(response,form) {

        // show toast
        this.toastr.success(response.message, 'Profile', {
            progressBar: true,
            toastClass: 'toast ngx-toastr',
            closeButton: true
        });
    }

    // handle error case
    handleError(error,form) {
        if (error.error && error.error.message) {
            // show toast
            this.toastr.error(error.error.message, 'Profile', {
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

    // Toggle Password Text Type Old
    togglePasswordTextTypeOld() {
      this.passwordTextTypeOld = !this.passwordTextTypeOld;
    }

    // Toggle Password Text Type New
    togglePasswordTextTypeNew() {
      this.passwordTextTypeNew = !this.passwordTextTypeNew;
    }

    // Toggle Password Text Type Retype
    togglePasswordTextTypeRetype() {
      this.passwordTextTypeRetype = !this.passwordTextTypeRetype;
    }

    // get user by id
    getUser() {
        this.authResponse=this.authService.getUser();
    }

    // On init
    ngOnInit() {

        // get user
        this.getUser();

        // content header
        this.contentHeader = {
        headerTitle: 'Account Settings',
        actionButton: true,
        breadcrumb: {
          type: '',
          links: [
            {
              name: 'Home',
              isLink: true,
              link: '/home'
            },
            {
              name: 'Account Settings',
              isLink: false
            }
          ]
        }
      };
    }

    profileFormSubmitted() {
        this.profileRequest.firstName = this.authResponse.firstName;
        this.profileRequest.lastName = this.authResponse.lastName;
        this.profileRequest.email = this.authResponse.email;
        this.profileService.updateProfile(this.profileRequest, this.authResponse.id).subscribe(
            (response: any) => {
                // change local storage data
                this.authResponse.firstName = response.data.firstName;
                this.authResponse.lastName = response.data.lastName;
                this.authResponse.email = response.data.email;

                // save to local storage
                this.authService.saveToLocalStorage(this.authResponse);

                this.handleSuccess(response,null);
            }, (error) => {
                console.log(error);
                this.handleError(error,null);
            }
        );
    }

    passwordFormSubmitted() {
        this.profileService.updatePassword(this.changePasswordRequest, this.authResponse.id).subscribe(
            (response: any) => {
                this.handleSuccess(response,null);
                console.log(response);
            }, (error) => {
                this.handleError(error,null);
                console.log(error);
            }
        );
    }
    cancelFormSubmitted() {
        // redirect to /home
        this.route.navigate(['/home']);
    }
}